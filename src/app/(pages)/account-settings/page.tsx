import ChangeUsername from "@/components/ChangeUsername";
import Main from "@/components/Main";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


const AccountSettings = async () => {

    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        redirect('/sign-in')
    }

    return (
        <Main>
            <ChangeUsername />
        </Main>
    )
}

export default AccountSettings