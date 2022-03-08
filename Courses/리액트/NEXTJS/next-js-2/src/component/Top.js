import { Header, Icon } from "semantic-ui-react";
import Gnb from "./Gnb"

export default function Top () {
    return (
        <div>
            <Icon name="sign language" size="massive" />
            <Header as="h1">코딩앙마</Header>
            <Gnb/>
        </div>
    )
}