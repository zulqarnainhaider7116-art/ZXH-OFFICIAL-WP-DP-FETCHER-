export default async function handler(req,res){
  const raw=(req.query.url||"").toString().trim();
  if(!raw) return res.status(400).json({success:false,error:"url is required"});
  // A phone number alone does not expose a public WhatsApp DP through an official unauthenticated endpoint.
  // Do not fabricate an image or bypass privacy settings.
  return res.status(404).json({
    success:false,
    error:"No public profile-picture source is available for this number/URL without an authorized data source."
  });
}