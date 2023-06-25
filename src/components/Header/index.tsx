import { HeaderContainer, HeaderContent, NewTransactionButton } from "./style";
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from '../../assets/Logo.svg'
import { NewTransactionModal } from "../NewTransactionModal/index";

export function Header() {
    return (
        <div>
            <HeaderContainer>
                <HeaderContent>
                    <img src={logoImg} alt="" />

                    <Dialog.Root>
                        {/*dialog trigger aproveita o botão ja criado*/}
                        <Dialog.Trigger as Child>
                            <NewTransactionButton>Nova Transação</NewTransactionButton>
                        </Dialog.Trigger>


                        <NewTransactionModal />

                    </Dialog.Root>

                </HeaderContent>
            </HeaderContainer>
        </div>
    )
}