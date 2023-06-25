import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

//criando esquema de campos do formulário
const searchFormSchema = z.object({
    query: z.string(),
})

//criando tipagem, inferindo a partir dos campos do zod
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {

    //utiliza a função compartilhada no contexto de leitura de dados da API
    const { fetchTransactions } = useContext(TransactionsContext)

    //formState is submiting retorna se o formulário ainda está enviando as informações ou não (true ou false).
    const {register, handleSubmit, formState: {isSubmiting}} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    }
    )

    async function handleSearchTransactions(data: SearchFormInputs) {
        //para testar se o botão fica desabilitado, como é muito rapido, cria uma Promise e libera o resolve apenas após 2 s.
        await fetchTransactions(data.query);
        console.log(data);
    }

    return (
        //disabled =disabilita o botão se ainda estiver processando o envio
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)} disabled={isSubmiting}>
            <input 
                type="text" 
                placeholder="Busque por transações" 
                {...register('query')}    
            />
            <button type="submit">
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}