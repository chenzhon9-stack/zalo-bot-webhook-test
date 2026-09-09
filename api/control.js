const {zaloPost,adminOK}=require("./zalo");
module.exports=async(req,res)=>{
 if(req.method!=="POST")return res.status(405).json({ok:false,error:"Method not allowed"});
 if(!adminOK(req))return res.status(403).json({ok:false,error:"Invalid admin key"});
 try{
  const action=String((req.body&&req.body.action)||"");
  if(action==="getMe"||action==="getWebhookInfo"||action==="deleteWebhook")return res.status(200).json(await zaloPost(action));
  if(action==="setWebhook"){
   const base=String(process.env.PUBLIC_BASE_URL||"").replace(/\/$/,"");
   if(!base.startsWith("https://"))return res.status(400).json({ok:false,error:"PUBLIC_BASE_URL phải là https://"});
   const body={url:base+"/webhook"};
   const secret=String(process.env.WEBHOOK_SECRET||"").trim();
   if(secret)body.secret_token=secret;
   const out=await zaloPost("setWebhook",body);
   return res.status(200).json({...out,requestedWebhookUrl:body.url});
  }
  return res.status(400).json({ok:false,error:"Action không hợp lệ"});
 }catch(e){return res.status(500).json({ok:false,error:String(e.message||e)});}
};
