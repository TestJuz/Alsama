package com.alsamatours.kiosk;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.*;
import android.net.Uri;
import androidx.webkit.WebViewAssetLoader;
import java.net.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import org.json.JSONObject;
public class MainActivity extends Activity {
 private WebView web;
 private final ExecutorService io=Executors.newSingleThreadExecutor();
 private static final String HOST="appassets.androidplatform.net";
 private static final String BUSINESS_ORIGIN="https://alsamatourscr.com";
 @Override public void onCreate(Bundle state){
  super.onCreate(state);
  getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON|WindowManager.LayoutParams.FLAG_SECURE);
  web=new WebView(this);setContentView(web);
  WebViewAssetLoader loader=new WebViewAssetLoader.Builder().addPathHandler("/assets/",new WebViewAssetLoader.AssetsPathHandler(this)).build();
  WebSettings settings=web.getSettings();settings.setJavaScriptEnabled(true);settings.setDomStorageEnabled(false);settings.setAllowFileAccess(false);settings.setAllowContentAccess(false);settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);settings.setSaveFormData(false);
  web.setWebViewClient(new WebViewClient(){
   @Override public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest r){Uri u=r.getUrl();if("https".equals(u.getScheme())&&HOST.equals(u.getHost())&&u.getPath().startsWith("/assets/"))return loader.shouldInterceptRequest(u);return new WebResourceResponse("text/plain","UTF-8",new ByteArrayInputStream(new byte[0]));}
   @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){Uri u=r.getUrl();return !("https".equals(u.getScheme())&&HOST.equals(u.getHost())&&u.getPath().startsWith("/assets/"));}
  });
  web.addJavascriptInterface(new Bridge(),"AlsamaNative");web.loadUrl("https://"+HOST+"/assets/index.html");immersive();
 }
 private void immersive(){getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY|View.SYSTEM_UI_FLAG_FULLSCREEN|View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN|View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_LAYOUT_STABLE);}
 @Override public void onWindowFocusChanged(boolean focused){super.onWindowFocusChanged(focused);if(focused)immersive();}
 @Override public void onBackPressed(){web.evaluateJavascript("window.__alsamaBack && window.__alsamaBack()",null);}
 @Override protected void onDestroy(){web.removeJavascriptInterface("AlsamaNative");web.destroy();io.shutdownNow();super.onDestroy();}
 private final class Bridge {
  @JavascriptInterface public void submit(String requestId,String payload){
   if(requestId==null||!requestId.matches("[a-f0-9-]{36}"))return;
   if(payload==null||payload.length()>100000){reply(requestId,false,"INVALID");return;}
   io.execute(()->{
    boolean ok=false;String code="NETWORK";HttpURLConnection conn=null;
    try{
     JSONObject data=new JSONObject(payload);
     if(!data.has("request_reference")||!data.has("selected_items")||!data.has("email")||!"Yes".equals(data.optString("consent"))){reply(requestId,false,"INVALID");return;}
     byte[] bytes=data.toString().getBytes(StandardCharsets.UTF_8);
     conn=(HttpURLConnection)new URL("https://formsubmit.co/ajax/info@alsamatourscr.com").openConnection();
     conn.setInstanceFollowRedirects(false);conn.setConnectTimeout(10000);conn.setReadTimeout(20000);conn.setRequestMethod("POST");conn.setDoOutput(true);
     conn.setRequestProperty("Content-Type","application/json");conn.setRequestProperty("Accept","application/json");
     conn.setRequestProperty("Referer",BUSINESS_ORIGIN+"/");conn.setRequestProperty("Origin",BUSINESS_ORIGIN);
     conn.setRequestProperty("User-Agent","AlsamaToursKiosk/1.0.1 (Android)");
     conn.setFixedLengthStreamingMode(bytes.length);
     try(OutputStream out=conn.getOutputStream()){out.write(bytes);}
     int status=conn.getResponseCode();code="HTTP_"+status;
     if(status>=200&&status<300){
      try(InputStream in=conn.getInputStream()){
       ByteArrayOutputStream buffer=new ByteArrayOutputStream();byte[] b=new byte[4096];int n;
       while((n=in.read(b))!=-1){buffer.write(b,0,n);if(buffer.size()>65536)throw new IOException("Response too large");}
       try{
        JSONObject result=new JSONObject(buffer.toString("UTF-8"));ok="true".equalsIgnoreCase(result.optString("success"));
        String msg=result.optString("message").toLowerCase(java.util.Locale.ROOT);
        code=ok?"OK":msg.contains("activat")?"ACTIVATION":msg.contains("web server")||msg.contains("referrer")||msg.contains("referer")?"REFERER":"REJECTED";
       }catch(org.json.JSONException e){code="INVALID_RESPONSE";}
      }
     }
    }catch(java.net.SocketTimeoutException e){code="TIMEOUT";}
     catch(java.net.UnknownHostException e){code="DNS";}
     catch(javax.net.ssl.SSLException e){code="TLS";}
     catch(Exception e){code="NETWORK";}
    finally{if(conn!=null)conn.disconnect();}
    // Never log request data or the provider's raw response.
    android.util.Log.i("AlsamaKiosk","Reservation delivery result: "+code);
    reply(requestId,ok,code);
   });
  }
  private void reply(String requestId,boolean ok,String code){
   runOnUiThread(()->{if(!isFinishing()&&!isDestroyed())web.evaluateJavascript("window.__alsamaResult && window.__alsamaResult("+JSONObject.quote(requestId)+","+ok+","+JSONObject.quote(code)+")",null);});
  }
 }
}