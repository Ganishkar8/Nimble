package com.nimble;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import android.util.Log;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class EKYC_OTP extends ReactContextBaseJavaModule {

public EKYC_OTP(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "EKYC_OTP";
    }

    private static final PidDataContainer PidDataContainer = null;
    static String aadharID = "717485993554";
    static String CI = "";
    static String Svalue = "";
    static String encyrptedPIDBase64 = "";
    static String encyrptedHmacBase64 = "";

     @ReactMethod
    public static void generate(String aadhar,String Mcc,String CA_TID,String CA_ID,String CA_TA,Callback result) {

        String licensekey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl/TbIAdNv5FtnmKgFNJJGjAl76wnBtlhxPAdH3GNwQHavfXfbYjW7RcW2/7aKU4Ti0tJaUBCBDek+R4v69TLhmSNV8PxXzU2Ap7eMNGKI5wnrYgQ5Lh0kFfCYY1KKxlZDIhsvzVgVmbDubG3rdvGP5IGQUwPspT1P6OfHI2jf+wftoIKwUytybZv6yYWf8W/XkIBgyrNWuMF9Go6FLzGpKW8QT22FBOjzSATZqMe/OsSqGC/oTjSsuTzWg3fhrOcQtXrXg2hylc9/qhwUDVXez2lJUGyUnRZEytu/rgBw5DqT1zRhTI5MHRS1Nl/uU1M/nEAjJ2bRsT0tNGMPhy+CQIDAQAB";
        SimpleDateFormat transm_date_timeFormat = new SimpleDateFormat("MMddhhmmss");
        transm_date_timeFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String Transm_Date_time = transm_date_timeFormat.format(new Date());

        SimpleDateFormat Local_Trans_Time_timeFormat = new SimpleDateFormat("hhmmss");
        Local_Trans_Time_timeFormat.setTimeZone(TimeZone.getTimeZone("GMT+5:30"));
        String Local_Trans_Time = Local_Trans_Time_timeFormat.format(new Date());
        //String Stan=new SimpleDateFormat("SSSSSS").format(new Date());//"352983";
        String Stan = Local_Trans_Time;//"352983";
        String Local_date = new SimpleDateFormat("MMdd").format(new Date());

        String RRNY = new SimpleDateFormat("yy").format(new Date());
        String RRN = RRNY.substring(1, 2) + new SimpleDateFormat("DDD").format(new Date()) + Local_Trans_Time.substring(0, 2) + Stan;
  Log.i("Stan", Stan);
    Log.i("Local_Trans_Time", Local_Trans_Time);
      Log.i("Local_date", Local_date);
        String generateOTPRequest = generateOTPRequest(aadhar,Transm_Date_time,Stan,Local_Trans_Time,Local_date,Mcc,CA_TID,CA_ID,CA_TA).replace("\\/", "/");
        Log.i("generateOTPRequest", generateOTPRequest);
        result.invoke(generateOTPRequest);
       // return generateOTPRequest;
    }

 @ReactMethod
    public static void validateotp(String aadhar,String otp,String stan,String transdatetime,String localTranstime,String localdate,String Mcc,String CA_TID,String CA_ID,String CA_TA,Callback result){
        SimpleDateFormat transm_date_timeFormat = new SimpleDateFormat("MMddhhmmss");
        transm_date_timeFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String Transm_Date_time = transm_date_timeFormat.format(new Date());

        SimpleDateFormat Local_Trans_Time_timeFormat = new SimpleDateFormat("hhmmss");
        Local_Trans_Time_timeFormat.setTimeZone(TimeZone.getTimeZone("GMT+5:30"));
        String Local_Trans_Time = Local_Trans_Time_timeFormat.format(new Date());
        String Stan = Local_Trans_Time;//"352983";
        String Local_date = new SimpleDateFormat("MMdd").format(new Date());
        PidDataContainer dataContainer =   createPIDForOTPVeri(otp);
        String validateOTPRequest ="";
        
        if(dataContainer!=null) {
            CI = dataContainer.getCertificateIdentifier();
            Svalue = dataContainer.getSessionKey();
            encyrptedPIDBase64 = dataContainer.getEncryptedPidInBase64();
            encyrptedHmacBase64 = dataContainer.getEncryptedHmacInBase64();

           // validateOTPRequest = validateOTPRequest(aadhar, transdatetime, stan, localTranstime, localdate, Mcc,CA_TID, CA_ID, CA_TA, CI, Svalue, encyrptedPIDBase64, encyrptedHmacBase64).replace("\\/", "/");
            validateOTPRequest = validateOTPRequest(aadhar, Transm_Date_time, stan, Local_Trans_Time, Local_date, Mcc,CA_TID, CA_ID, CA_TA, CI, Svalue, encyrptedPIDBase64, encyrptedHmacBase64).replace("\\/", "/");
            System.out.println(validateOTPRequest);
            
        }
        Log.i("validateOTPRequest", validateOTPRequest);
        result.invoke(validateOTPRequest);
    }

 @ReactMethod
    private static  String generateOTPRequest(String aadharID,String Transm_Date_time,String stan,String Local_Trans_Time,String Local_date,String Mcc,String CA_TID,String CA_ID,String CA_TA ) {

        JSONObject jsonObject = new JSONObject();
        //SecureRandom secureRandom = new SecureRandom();
        String otpRequest="";
        try {
             otpRequest = "<OtpRequest>"
                    + "<TransactionInfo><UID type=\'U\'>"+aadharID+"</UID>"
                  //  + "<Pan>200195"+"0"+aadharID+"</Pan>"
                  //  + "<Proc_Code>140000</Proc_Code>"
                    + "<Transm_Date_time>"+Transm_Date_time+"</Transm_Date_time>"
                    + "<Stan>"+stan+"</Stan>"
                    + "<Local_Trans_Time>"+Local_Trans_Time+"</Local_Trans_Time>"
                    + "<Local_date>"+Local_date+"</Local_date>"
                    + "<Mcc>"+Mcc+"</Mcc>" //key1
                   // + "<Pos_entry_mode>019</Pos_entry_mode>"
                   // + "<Pos_code>05</Pos_code>"
                    //+ "<AcqId>200195</AcqId>"
                    //+ "<RRN>"+RRN+"</RRN>"
                    + "<CA_ID>"+CA_ID+"</CA_ID>" //key5
                    + "<CA_TID>"+CA_TID+"</CA_TID>"  //key3
                    + "<CA_TA>"+CA_TA+"</CA_TA>" //key 8
                    + "</TransactionInfo>"
                   // + "<Opts uid=\""+aadharID+"\" tid=\"registered\" ac=\"EQUITAS-eKYC\" sa=\"EQUITAS-eKYC\" ver=\"2.5\" txn=\""+RRN+"\" ts=\""+Transm_Date_time+"\" lk=\""+licensekey+"\"/>"
                    // + "<Opts uid=\'"+aadharID+"\' tid=\'registered\' ac=\'EQUITAS-eKYC\' sa=\'EQUITAS-eKYC\' ver=\'2.5\' txn=\'"+RRN+"\' ts=\'"+Transm_Date_time+"\'/>"
                     + "<Opts ch=\'01\'/>"
                    + "</OtpRequest>";

            jsonObject.put("eKYCXMLStringReqPayload", otpRequest);
            Log.i("otpRequest", otpRequest);
        } catch (JSONException e) {

            System.out.println(e.getMessage());
        }

        return otpRequest;

    }

 @ReactMethod
    private static PidDataContainer createPIDForOTPVeri(String receivedotp) {

        PidDataContainer dataContainer = null;
        try {
            Date date = new Date(System.currentTimeMillis());
            SimpleDateFormat sdf;
            sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("CET"));
            String text = sdf.format(date);

            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();

            Document doc = docBuilder.newDocument();
            Element rootElement = doc.createElement("Pid");

            Attr ts = doc.createAttribute("ts");
            ts.setValue(text);

            Attr ver = doc.createAttribute("ver");
            ver.setValue("2.0");

            //Attr wadh = doc.createAttribute("wadh");
            //wadh.setValue("");

            rootElement.setAttributeNode(ts);
            rootElement.setAttributeNode(ver);
            //rootElement.setAttributeNode(wadh);

            Element element = doc.createElement("Pv");

            Attr otp = doc.createAttribute("otp");
            otp.setValue(receivedotp);

            element.setAttributeNode(otp);

            rootElement.appendChild(element);
            //final pidblock in xml type in doc
            doc.appendChild(rootElement);

            System.out.println(doc.toString());

           // InputStream inputStream = new FileInputStream(new File("uidai_auth_" + "preprod" + ".cer"));
           

            dataContainer =  AadhaarAuthModule.createAadhaarAuthData(Utils.prettyPrint(doc).getBytes(), "preprod", sdf.format(date) + "");

            CI = dataContainer.getCertificateIdentifier();
            Svalue = dataContainer.getSessionKey();
            encyrptedPIDBase64 = dataContainer.getEncryptedPidInBase64();
            encyrptedHmacBase64 = dataContainer.getEncryptedHmacInBase64();
            return dataContainer;


        } catch (Exception e) {
            e.printStackTrace();
            
        }

        return PidDataContainer;
    }

 @ReactMethod
    private static  String validateOTPRequest(String aadharID,String Transm_Date_time,String stan,String Local_Trans_Time,String Local_date,String Mcc,String CA_TID,String CA_ID,String CA_TA,String ci,String skey,String encryptedPid,String encryptedhmac) {

        JSONObject jsonObject = new JSONObject();
        String otpRequest="";
        //SecureRandom secureRandom = new SecureRandom();

        try {
             otpRequest = "<KycRequest>"
                    + "<TransactionInfo>"
                    + "<UID type=\'U\'>"+aadharID+"</UID>"
                    //+ "<Pan>200195"+"0"+aadharID+"</Pan>"
                    //+ "<Proc_Code>140000</Proc_Code>"
                    + "<Transm_Date_time>"+Transm_Date_time+"</Transm_Date_time>"
                    + "<Local_Trans_Time>"+Local_Trans_Time+"</Local_Trans_Time>"
                    + "<Local_date>"+Local_date+"</Local_date>"
                    + "<Mcc>"+Mcc+"</Mcc>"
                    //+ "<Pos_entry_mode>019</Pos_entry_mode>"
                    //+ "<Pos_code>05</Pos_code>"
                    //+ "<AcqId>200195</AcqId>"
                    //+ "<RRN>"+RRN+"</RRN>"
                    + "<CA_TID>"+CA_TID+"</CA_TID>"
                    + "<CA_ID>"+CA_ID+"</CA_ID>"
                    + "<CA_TA>"+CA_TA+"</CA_TA>"
                    + "<Stan>"+stan+"</Stan>"
                    + "</TransactionInfo>"
                     + "<KycReqInfo ver=\'2.5\' ra=\'O\' rc=\'Y\' pfr=\'N\' lr=\'Y\' de=\'N\'>"
                    //+ "Auth ac=\"EQUITAS-eKYC\" lk=\""+licenseKey+"\" sa=\"EQUITAS-eKYC\" tid=\"registered\"  txn=\"UKC:"+RRN+"\" uid=\""+aadharID+"\" ver=\"2.5\""
                    //+ "<Auth ac=\"EQUITAS-eKYC\" sa=\"EQUITAS-eKYC\" tid=\"registered\"  txn=\"UKC:220816031480\" uid=\""+aadharID+"\" ver=\"2.5\"/>"
                    + "<Auth  txn=\'UKC:"+stan+"\'  ver=\'2.5\'>"
                     + "<Uses pi=\'n\' pa=\'n\' pfa=\'n\' pin=\'n\' bio=\'n\' otp=\'y\' />"
                    //+ "<Meta udc=\"WEB000002040444\" rdsId=\"\" rdsVer=\"\" dpId=\"\" dc=\"\" mi=\"\" mc=\"\" />"
                    + "<Meta/>"
                    + "<Skey  ci=\'"+ci+"\'>"+skey+"</Skey>"
                    + "<Data type=\'X\'>"+encryptedPid+"</Data>"
                    + "<Hmac>"+encryptedhmac+"</Hmac>"
                    + "</Auth>"
                    + "</KycReqInfo>"
                    + "</KycRequest>";

            System.out.println(otpRequest);

            jsonObject.put("eKYCXMLStringReqPayload", otpRequest);
        } catch (JSONException e) {

            System.out.println(e.getMessage());
        }

        return otpRequest;

    }


}