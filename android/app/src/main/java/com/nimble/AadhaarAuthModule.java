package com.nimble;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Base64;


public class AadhaarAuthModule extends ReactContextBaseJavaModule {


public static String certificateString = "-----BEGIN CERTIFICATE-----" +
			"MIIGLjCCBRagAwIBAgIEAV9PejANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJJ\r\n" +
			"\r\n" +
			"TjEYMBYGA1UEChMPZU11ZGhyYSBMaW1pdGVkMR0wGwYDVQQLExRDZXJ0aWZ5aW5\r\n" +
			"n\r\n" +
			"IEF1dGhvcml0eTE2MDQGA1UEAxMtZS1NdWRocmEgU3ViIENBIGZvciBDbGFzcy\r\n" +
			"Az\r\n" +
			"IE9yZ2FuaXNhdGlvbiAyMDIyMB4XDTIyMDkzMDA2MjQ1NloXDTI1MDkyOTA2M\r\n" +
			"jQ1\r\n" +
			"NlowggEGMQswCQYDVQQGEwJJTjEOMAwGA1UEChMFVUlEQUkxDjAMBgNVBAsT\r\n" +
			"BVVJ\r\n" +
			"REFJMUkwRwYDVQQUE0A2Y2EyZTY4ZWE1NThlN2IzZjQ3YTFkYmI3MDAzMDc\r\n" +
			"2MTcy\r\n" +
			"OWFkZDM5ZTRkM2QzNmNkMzJiOGRlOWNmNWNlMzQ3MQ8wDQYDVQQREwY1Nj\r\n" +
			"AwOTIx\r\n" +
			"EjAQBgNVBAgTCUtBUk5BVEFLQTFJMEcGA1UEBRNAYjk5YzAwMWVmNWI2N\r\n" +
			"zlmYTk2\r\n" +
			"NzBmNmU4NWY2MGIwODM2NzA0YmIyNDdjZGQ5MzNjOWRhZmQ3MzkxZmNj\r\n" +
			"NWI3ZTEc\r\n" +
			"MBoGA1UEAxMTS2lyYW4gS3VtYXIgR3VtbWFkaTCCASIwDQYJKoZIhvc\r\n" +
			"NAQEBBQAD\r\n" +
			"ggEPADCCAQoCggEBANISHbd5GCG06iKXnehsryFReEnIyGCwGaGdAK\r\n" +
			"mM4ci0cZ2d\r\n" +
			"4JDSiFKP1n4JFicQek42hoYUZAqukCpawsZvR8prbELXtmJzt+B75\r\n" +
			"cVTIorTg3b1\r\n" +
			"9c/Kf6OvwgkKACmFqL8IAsjVdDZ4ldCcGzMgA8HKDp7D5nSlGpvO\r\n" +
			"JJoCH+XeVYdR\r\n" +
			"44phBmlRsVeGd9vJRGVRSQEewzGWVY0PeHithNjIqHBz66+9ao+\r\n" +
			"2GvnjD1nBQOpC\r\n" +
			"0N2S6mOFGLzu4DR4yT0J0dXhQbv6gaRMeaFaJCeifd0JE1M5B5\r\n" +
			"JCZgIcWG+RGyhf\r\n" +
			"mA48VyGgEIAqx5OGKx2cgweXOdpuWyjA1BAkUFsCAwEAAaOCA\r\n" +
			"igwggIkMCEGA1Ud\r\n" +
			"EQQaMBiBFmFkYXV0aC50Y0B1aWRhaS5uZXQuaW4wHwYDVR0j\r\n" +
			"BBgwFoAUsg3QU6M3\r\n" +
			"o65VgkuZPUYoHIlWS6wwHQYDVR0OBBYEFImhRhDyUvR8C55\r\n" +
			"Hkt5VpEZ7RpnyMAwG\r\n" +
			"A1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgUgMBkGA1UdJQ\r\n" +
			"EB/wQPMA0GCysGAQQB\r\n" +
			"gjcKAwQBMIG7BgNVHSAEgbMwgbAwLQYGYIJkZAIDMCMwI\r\n" +
			"QYIKwYBBQUHAgIwFRoT\r\n" +
			"Q2xhc3MgMyBDZXJ0aWZpY2F0ZTAtBgZggmRkAgIwIzAh\r\n" +
			"BggrBgEFBQcCAjAVGhND\r\n" +
			"bGFzcyAyIENlcnRpZmljYXRlMFAGB2CCZGQBCAIwRTB\r\n" +
			"DBggrBgEFBQcCARY3aHR0\r\n" +
			"cDovL3d3dy5lLW11ZGhyYS5jb20vcmVwb3NpdG9yeS\r\n" +
			"9jcHMvZS1NdWRocmFfQ1BT\r\n" +
			"LnBkZjB9BggrBgEFBQcBAQRxMG8wJAYIKwYBBQUHM\r\n" +
			"AGGGGh0dHA6Ly9vY3NwLmUt\r\n" +
			"bXVkaHJhLmNvbTBHBggrBgEFBQcwAoY7aHR0cDov\r\n" +
			"L3d3dy5lLW11ZGhyYS5jb20v\r\n" +
			"cmVwb3NpdG9yeS9jYWNlcnRzL2VtY2wzb3JnMjA\r\n" +
			"yMi5jcnQwSQYDVR0fBEIwQDA+\r\n" +
			"oDygOoY4aHR0cDovL3d3dy5lLW11ZGhyYS5jb2\r\n" +
			"0vcmVwb3NpdG9yeS9jcmxzL2Vt\r\n" +
			"Y2wzb3JnMjAyMi5jcmwwDQYJKoZIhvcNAQELB\r\n" +
			"QADggEBAAJfBBLIWOlSRoVOoXS6\r\n" +
			"mT80Y/9+O2OUJ5/nnjf4RMXOUEaUr3n1yIPk\r\n" +
			"FPVcQAfFPieNPmYcmJe8ZW2ZS9LO\r\n" +
			"gXhFzeRp+Lt4mdZ682tjAftgOseytLoLxWL\r\n" +
			"xwY1IKz+dpqvxsiYz92WbuEpYxHI2\r\n" +
			"kmNj1wIFrz4lI1H9Rm0LCshEziTBfWAWUl\r\n" +
			"WIiyBgRqiWKEr59J0NkBftF3YQbbP3\r\n" +
			"XI0jxEd+aPuKReLRp4Xh3r7TfjrU6QUzt\r\n" +
			"GeUWX6QT+8WjG8Q2Ndyw2D1ShuSX/IP\r\n" +
			"q/Rm8Mtt/lBBJTeNfbK0oqwcbH1Q9/Uy\r\n" +
			"IBPilG9dzA5V4hWUYtA6DFiCsWTgwoDA\r\n" +
			"ibY=" +
			"-----END CERTIFICATE-----";

    public AadhaarAuthModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AadhaarAuthModule";
    }

    // Define methods that you want to expose to JavaScript
    // For example, you can create a method for creating Aadhaar authentication data.
    @ReactMethod
    public static PidDataContainer createAadhaarAuthData(byte[] plainPid, String environment, String pidTimestamp)
				throws IOException, java.security.cert.CertificateException {

			PidDataContainer container;
			// Load UIDAI public key based on environment
			//X509Certificate publicKey = getUidaiPublicCertificate(environment);
			//X509Certificate publicKey = getUidaiPublicCertificatePem(Relevant.certificateString);
			X509Certificate publicKey = getUidaiPublicCertificatePem(AadhaarAuthModule.certificateString);

			// (IST only) pidTimestamp Format: "2015-12-31T23:59:59"
			// AuthRequestDataFromDevice authData = PrepareAUAData(cert, pidBytes,
			// pidTimestamp);

			byte[] encryptedPid = null;
			byte[] encryptedHmacBytes = null;
			byte[] sessionKey = null;
			byte[] encryptedSessionKey=null;
			
			String certificateIdentifier;

			try {
				sessionKey = EncryptionUtil.generateSessionKey();
				
				System.out.println(" sessionKey " +sessionKey);
				
				encryptedSessionKey = EncryptionUtil.encryptUsingPublicKey(publicKey, sessionKey);
				
				System.out.println("encryptedSessionKey" +encryptedSessionKey);

				encryptedPid = EncryptionUtil.encryptUsingSessionKey(sessionKey, plainPid, pidTimestamp.getBytes());
				System.out.println("encryptedPid" +encryptedPid);
				byte[] hmac = generateSha256Hash(plainPid);
				encryptedHmacBytes = EncryptionUtil.encryptUsingSessionKey(sessionKey, hmac, pidTimestamp.getBytes());

				System.out.println("encryptedHmacBytes" +encryptedHmacBytes);
				// skey.ci
				certificateIdentifier = EncryptionUtil.getCertificateIdentifier(publicKey);

			} catch (Exception e) {
				e.printStackTrace();
				// LOG.error("Error while creating auth reqeust", e);
				throw new RuntimeException("Error while creating auth reqeust", e);
			}

			// Need to append TimeStamp bytes before the encrypted PID byte
			byte[] c = new byte[pidTimestamp.getBytes().length + encryptedPid.length];
			System.arraycopy(pidTimestamp.getBytes(), 0, c, 0, pidTimestamp.getBytes().length);
			System.arraycopy(encryptedPid, 0, c, pidTimestamp.getBytes().length, encryptedPid.length);

			// pid.format
			String pidFormat = "X";
			// pid.value
			String encryptedPidInBase64 = new String(Base64.getEncoder().encode(c));
			System.out.println("encryptedPidInBase64" +encryptedPidInBase64);
			// hmac
			String encryptedHmacInBase64 = new String(Base64.getEncoder().encode(encryptedHmacBytes));
			System.out.println("encryptedHmacInBase64" +encryptedHmacInBase64);
			// skey.value
			String sessionKeyValue = new String(Base64.getEncoder().encode(encryptedSessionKey));
			System.out.println("sessionKeyValue" +sessionKeyValue);
			
			//
			
			container = new PidDataContainer(encryptedPidInBase64, encryptedHmacInBase64, certificateIdentifier,sessionKeyValue);
			
			return container;

		}





@ReactMethod
public static X509Certificate getUidaiPublicCertificatePem(String certificateString) throws IOException, java.security.cert.CertificateException {
			X509Certificate certificate = null;
		    CertificateFactory cf = null;
		    if (certificateString != null && !certificateString.trim().isEmpty()) {
			    certificateString = certificateString.replace("-----BEGIN CERTIFICATE-----", "")
			            .replace("-----END CERTIFICATE-----", "").replace("\r\n", ""); // NEED FOR PEM FORMAT CERT STRING
			    byte[] certificateData = java.util.Base64.getDecoder().decode(certificateString);
			    cf = CertificateFactory.getInstance("X509");
			    certificate = (X509Certificate) cf.generateCertificate(new ByteArrayInputStream(certificateData));
			}
		    return certificate;
		}
@ReactMethod
		public static byte[] generateSha256Hash(byte[] message) {
			String algorithm = "SHA-256";

			byte[] hash = null;

			MessageDigest digest;
			try {
				digest = MessageDigest.getInstance(algorithm);
				digest.reset();
				hash = digest.digest(message);
			} catch (Exception e) {
				throw new RuntimeException("Error while generating SHA-256 hash", e);
				// LOG.error("Error while generating SHA-256 hash", e);
			}

			return hash;
		}

    



}
