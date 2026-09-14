export default async function handler(req,res){
 try{
  const raw=(req.query.url||"").toString().trim(), filename=(req.query.filename||"download").toString().replace(/[^a-zA-Z0-9._-]/g,"_");
  if(!/^https?:\\/\\//i.test(raw)) return res.status(400).send("Invalid URL");
  const u=new URL(raw); if(!["https:","http:"].includes(u.protocol)) return res.status(400).send("Invalid URL");
  const r=await fetch(u.toString(),{headers:{"User-Agent":"Mozilla/5.0 (compatible; ZXH-WADP/1.0)"}});
  if(!r.ok) return res.status(502).send("Remote image unavailable");
  const type=r.headers.get("content-type")||"application/octet-stream";
  res.setHeader("Content-Type",type);res.setHeader("Content-Disposition",`attachment; filename="${filename}"`);
  const buf=Buffer.from(await r.arrayBuffer());return res.status(200).send(buf);
 }catch(e){return res.status(500).send("Proxy failed");}
}