import Link from "next/link";
import { Footer } from "../components/footer";
const home =()=>{
  return(
    <div className="space-y-4">
       <p className="text-gray-800">
                <span className="block">+44 (0) 9865 124 765</span>
                <span className="block">+44 (0) 9861 432 543</span>
              </p>
              <p className="text-gray-800">
                <span className="block">www.yourdomain.com</span>
                <span className="block">info@yourdomain.com</span>
              </p>
              <p className="text-gray-800">
                11 Beaufort Court Canal<br />
                Wharf UK E10AL
              </p>

    </div>
  )
}
export default home