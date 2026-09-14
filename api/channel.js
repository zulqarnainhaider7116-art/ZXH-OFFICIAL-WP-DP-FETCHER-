function esc(s){return (s||"").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");}
function meta(html,key){
 const re1=new RegExp('<meta[^>]+property=["\\']'+key.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')+'["\\'][^>]+content=["\\']([^"\\']*)["\\']','i');
 const re2=new RegExp('<meta[^>]+content=["\\']([^"\\']*)["\\'][^>]+property=["\\']'+key.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')+'["\\']','i');
 const m=html.match(re1)||html.match(re2); return m?esc(m[1]):"";
}
export default async function handler(req,res){
 try{
  const raw=(req.query.url||"").toString().trim();
  if(!/^https?:\\/\\/(www\\.)?whatsapp\\.com\\/channel\\//i.test(raw)) return res.status(400).json({success:false,error:"Enter a valid public WhatsApp channel URL."});
  const u=new URL(raw); const r=await fetch(u.toString(),{redirect:"follow",headers:{"User-Agent":"Mozilla/5.0 (compatible; ZXH-WADP/1.0)","Accept":"text/html,application/xhtml+xml"}});
  const html=await r.text();
  if(!r.ok) return res.status(502).json({success:false,error:"WhatsApp channel page could not be fetched."});
  const title=meta(html,"og:title")||meta(html,"twitter:title");
  const image=meta(html,"og:image")||meta(html,"twitter:image");
  const description=meta(html,"og:description")||meta(html,"twitter:description");
  const followerMatch=html.match(/([\\d,.]+\\s*(?:K|M|B)?)[\\s]*followers/i);
  return res.status(200).json({success:true,data:{title,followers:followerMatch?followerMatch[1]+" followers":"",description,image}});
 }catch(e){return res.status(500).json({success:false,error:"Channel lookup failed."});}
}