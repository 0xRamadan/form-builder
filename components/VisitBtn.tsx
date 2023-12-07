"use client"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function VisitBtn({shareUrl}: {shareUrl: string}) {
    const [mounted, setMounted] = useState<boolean>(false);
    const shareLink = `${window.location.origin}/submit/${shareUrl}`

    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted){
        return null; // avoid window not defined error.
    }

  return (
    <Button className="w-[200px]" onClick={()=>{
        window.open(shareLink, "_blank")
    }}>Visit</Button>
  )
}

export default VisitBtn