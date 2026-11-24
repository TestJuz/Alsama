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
  @JavascriptInterface public void submit(String payload){
   if(payload==null||payload.length()>100000){reply(false);return;}
   io.execute(()->{boolean ok=false;HttpURLConnection conn=null;try{
    JSONObject data=new JSONObject(payload);
    if(!data.has("request_reference")||!data.has("selected_items")||!data.has("email")||!"Yes".equals(data.optString("consent")))throw new IOException("Invalid request");
    byte[] bytes=data.toString().getBytes(StandardCharsets.UTF_8);
    conn=(HttpURLConnection)new URL("https://formsubmit.co/ajax/info@alsamatourscr.com").openConnection();
    conn.setInstanceFollowRedirects(false);conn.setConnectTimeout(10000);conn.setReadTimeout(20000);conn.setRequestMethod("POST");conn.setDoOutput(true);conn.setRequestProperty("Content-Type","application/json");conn.setRequestProperty("Accept","application/json");conn.setFixedLengthStreamingMode(bytes.length);
    try(OutputStream out=conn.getOutputStream()){out.write(bytes);}
    int status=conn.getResponseCode();if(status>=200&&status<300){try(InputStream in=conn.getInputStream()){ByteArrayOutputStream buffer=new ByteArrayOutputStream();byte[] b=new byte[4096];int n;while((n=in.read(b))!=-1){buffer.write(b,0,n);if(buffer.size()>65536)throw new IOException("Response too large");}JSONObject result=new JSONObject(buffer.toString("UTF-8"));ok="true".equalsIgnoreCase(result.optString("success"));}}
   }catch(Exception ignored){}finally{if(conn!=null)conn.disconnect();reply(ok);}});
  }
  private void reply(boolean ok){runOnUiThread(()->{if(!isFinishing())web.evaluateJavascript("window.__alsamaResult && window.__alsamaResult("+ok+")",null);});}
 }
}