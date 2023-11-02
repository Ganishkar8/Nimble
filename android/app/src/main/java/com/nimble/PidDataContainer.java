package com.nimble;

public class PidDataContainer {
	
	String encryptedPidInBase64, encryptedHmacInBase64, certificateIdentifier, sessionKey;
	
	

	public PidDataContainer(String encryptedPidInBase64, String encryptedHmacInBase64, String certificateIdentifier, String sessionKey) {
		super();
		this.encryptedPidInBase64 = encryptedPidInBase64;
		this.encryptedHmacInBase64 = encryptedHmacInBase64;
		this.certificateIdentifier = certificateIdentifier;
		this.sessionKey = sessionKey;
	}

	public String getEncryptedPidInBase64() {
		return encryptedPidInBase64;
	}

	public void setEncryptedPidInBase64(String encryptedPidInBase64) {
		this.encryptedPidInBase64 = encryptedPidInBase64;
	}

	public String getEncryptedHmacInBase64() {
		return encryptedHmacInBase64;
	}

	public void setEncryptedHmacInBase64(String encryptedHmacInBase64) {
		this.encryptedHmacInBase64 = encryptedHmacInBase64;
	}

	public String getCertificateIdentifier() {
		return certificateIdentifier;
	}

	public void setCertificateIdentifier(String certificateIdentifier) {
		this.certificateIdentifier = certificateIdentifier;
	}

	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}
	
	

	
	

}
