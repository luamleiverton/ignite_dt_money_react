import { useContext } from "react";
import { Header } from "../../components/Header/index";
import { Summary } from "../../components/Header/Summary/index";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm/index";
import { PriceHighlight, TransactionsContainer, TransctionsTable } from "./style";


export function Transactions() {

    const { transactions } = useContext(TransactionsContext);

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransctionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                    <PriceHighlight variant={transaction.type}>
                                        {(transaction.type === 'outcome' && '-')}
                                        {priceFormatter.format(transaction.price)}
                                    </PriceHighlight>    
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dataFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransctionsTable>
            </TransactionsContainer>

        </div>
    )
}