import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { X, ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';


//criando o esquema de campos do formulário de transação
const newTransactionSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputs = z.infer<typeof newTransactionSchema>;

export function NewTransactionModal() {

    const { createTransactions } = useContext(TransactionsContext);

    //register captura campos nativos do html como inputs, para campos implementados com componentes usar control
    //Circunda o componente criado com Controller e passa o control, o nome do atributo e um render que usa o field para controlar os valores do input
    const {control, register, handleSubmit, formState: {isSubmitting}, reset, } = useForm<newTransactionFormInputs>({
        resolver: zodResolver(newTransactionSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: newTransactionFormInputs) {
        const { description, price, category, type } = data;
        await createTransactions({
            description, 
            price, 
            category, 
            type, 
        })

        reset();

    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input type="text" placeholder="Descrição" required {...register('description')}/>
                    <input type="number" placeholder="Preço" required {...register('price', {valueAsNumber: true})}/>
                    <input type="text" placeholder="Categoria" required {...register('category')}/>

                    
                    <Controller 
                        control={control}
                        name="type"
                        render={({ field }) => {
                            
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton variant="outcome" value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />
                    

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>

                
            </Content>
        </Dialog.Portal>

    )
}