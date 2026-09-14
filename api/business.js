export default async function handler(req,res){
  const raw=(req.query.url||"").toString().trim();
  if(!raw) return res.status(400).json({success:false,error:"url is required"});
  return res.status(404).json({
    success:false,
    error:"No public business-cover source is available through an unauthenticated official endpoint."
  });
}