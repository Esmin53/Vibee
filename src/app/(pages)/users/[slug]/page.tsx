import Accounts from "@/components/Accounts"
import FooterComponent from "@/components/FooterComponent"
import Main from "@/components/Main"

const Users = () => {

    return (
        <Main>
            <Accounts />
            <div className="w-full md:hidden fixed bottom-0">
                <FooterComponent />
            </div>
        </Main>
    )
}

export default Users