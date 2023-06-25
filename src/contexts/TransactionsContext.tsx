import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

//desacoplando o tipo dos dados criando nova interface
interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';

}


interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransactions: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
    children: ReactNode;
}



export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider ({ children }: TransactionProviderProps) {


    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        
        const response = await api.get('transactions', {
            params: {
                //configurando ordenação pelo campo createdAt e em ordem decrescente
                _sort: 'createdAt',
                _order: 'desc',
                q: query,
            }
        })
        
       
        setTransactions(response.data)
    }

    async function createTransactions(data: CreateTransactionInput) {
        
        
        const response = await api.post('transactions', {
            description: data.description,
            price: data.price,
            category: data.category,
            type: data.type,
            createdAt: new Date(),
        })


        setTransactions(state => [response.date, ...state]);

    } 


    useEffect(() => {
        fetchTransactions();
    }, []
    )

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}