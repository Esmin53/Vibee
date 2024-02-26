import Main from "@/components/Main";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


export const Settings = async () => {

    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        redirect('/sign-in')
    }

    return (
        <Main>
            Settings
        </Main>
    )
}

export default Settings