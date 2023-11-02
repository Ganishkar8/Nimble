
package com.nimble;

import org.bouncycastle.crypto.InvalidCipherTextException;
import org.bouncycastle.crypto.engines.AESEngine;
import org.bouncycastle.crypto.modes.GCMBlockCipher;
import org.bouncycastle.crypto.params.AEADParameters;
import org.bouncycastle.crypto.params.KeyParameter;

import javax.crypto.*;
import java.io.IOException;
import java.security.*;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class EncryptionUtil {
	
	private static final String ASYMMETRIC_ALGO = "RSA/ECB/PKCS1Padding";
    private static final int SYMMETRIC_KEY_SIZE = 256;
    public static final int AUTH_TAG_SIZE_BITS = 128;

    /**
     * Encrypts given data using UIDAI public key
     *
     * @param certificate
     *            object corresponding to .cer file representing public key. For
     *            example, UIDAI public key file
     * @param data
     *            Data to encrypt
     * @return Encrypted data
     * @throws IOException
     * @throws GeneralSecurityException
     */
    public static byte[] encryptUsingPublicKey(X509Certificate certificate, byte[] data)
            throws IOException, GeneralSecurityException {
        // encrypt the session key with the public key
        Cipher pkCipher = Cipher.getInstance(ASYMMETRIC_ALGO);
        pkCipher.init(Cipher.ENCRYPT_MODE, certificate.getPublicKey());
        return pkCipher.doFinal(data);
    }

    /**
     * Encrypts given data using session key
     *
     * @param skey
     *            Session key
     * @param data
     *            Data to encrypt
     * @return Encrypted data
     * @throws InvalidCipherTextException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws InvalidAlgorithmParameterException
     * @throws InvalidKeyException
     * @throws NoSuchPaddingException
     * @throws NoSuchProviderException
     * @throws NoSuchAlgorithmException
     */
    public static byte[] encryptUsingSessionKey(byte[] skey, byte[] data, byte[] ts) throws InvalidCipherTextException,
            IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException,
            NoSuchAlgorithmException, NoSuchProviderException, NoSuchPaddingException, InvalidKeyException {
        System.out.println("Data is : %s"+data);
        System.out.println("Lenght of data is : %s"+data.length);
        //Last 12-bytes of ts as IV or Nonce
        byte[] iv = new byte[12];
        System.arraycopy(ts, ts.length-12, iv, 0,iv.length);

        //Last 16-bytes of ts as AAD
        byte[] aad = new byte[16];
        System.arraycopy(ts, ts.length-16, aad,0, aad.length);

        // Authenticated Encryption with Associated Data (AEAD)
        AEADParameters parameters = new AEADParameters( new KeyParameter(skey), 128, iv, aad);

        GCMBlockCipher gcmEngine = new GCMBlockCipher(new AESEngine());
        gcmEngine.init(true, parameters);
        byte[] encMsg = new byte[gcmEngine.getOutputSize(data.length)];
        int encLen = gcmEngine.processBytes(data, 0, data.length, encMsg, 0);
        encLen += gcmEngine.doFinal(encMsg, encLen);
        return encMsg;
    }

    public static byte[] encryptUsingSessionKey(boolean cipherOperation, byte[] skey, byte[] iv, byte[] aad,

                                                byte[] data) throws IllegalStateException, InvalidCipherTextException {
        AEADParameters aeadParam = new AEADParameters(new KeyParameter(skey), AUTH_TAG_SIZE_BITS,
                iv, aad);
        GCMBlockCipher gcmb = new GCMBlockCipher(new AESEngine());
        gcmb.init(cipherOperation, aeadParam);
        int outputSize = gcmb.getOutputSize(data.length);
        byte[] result = new byte[outputSize];
        int processLen = gcmb.processBytes(data, 0, data.length, result, 0);
        gcmb.doFinal(result, processLen);
        return result;
    }

    /**
     * Creates a AES key that can be used as session key (skey)
     *
     * @return
     * @throws NoSuchAlgorithmException
     * @throws NoSuchProviderException
     */
    public static byte[] generateSessionKey() throws NoSuchAlgorithmException, NoSuchProviderException {
        KeyGenerator kgen = KeyGenerator.getInstance("AES");
        kgen.init(SYMMETRIC_KEY_SIZE);
        SecretKey symmetricKey = kgen.generateKey();
        return symmetricKey.getEncoded();
    }

    /**
     * Returns UIDAI certificate's expiry date in YYYYMMDD format using GMT time
     * zone. It can be used as certificate identifier
     *
     * @param certificate
     *            object corresponding to .cer file representing public key. For
     *            example, UIDAI public key file
     * @return Certificate identifier for UIDAI public certificate
     */
    static String getCertificateIdentifier(X509Certificate certificate) {
        SimpleDateFormat ciDateFormat = new SimpleDateFormat("yyyyMMdd");
        ciDateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        return ciDateFormat.format(certificate.getNotAfter());
    }

}