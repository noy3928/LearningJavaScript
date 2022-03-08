import { Grid, Image } from "semantic-ui-react";
import Gnb from "./Gnb"
import Link from "next/link";

export default function ItemList ({list}) {

    return (
        <div>
        <Grid columns={3}>
            <Grid.Row>
            {list.map((item) => (
            <Link key={item.name} href={`/detail/${item.id}`} >
                <a>
                <Grid.Column key={item.name}>
                    <img src={item.image_link} alt={item.name} />
                    {/* <Image src={item.image_link} alt={item.name} /> */}
                    <span>
                        {item.category} {item.product_type}
                    </span>
                    <strong>{item.name}</strong>
                    <strong>${item.price}</strong>
                </Grid.Column>
                </a>
            </Link>
            ))}
            </Grid.Row>
        </Grid>
    </div>
    )
}