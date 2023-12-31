import React , {Component} from "react";
import {Card,Grid, GridColumn,Button} from 'semantic-ui-react';
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import {Link} from "../../routes";

class CampaignShow extends Component {

    static async getInitialProps(props){
        const campaign =Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return { 
            address:props.query.address,
            minimumContribution:summary[0],
            balance :summary[1],
            requestCount:summary[2],
            approversCount:summary[3],
            manager:summary[4],

        };
    }

    renderCards(){
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        }=this.props;
        const item = 
        [
            {
                header:manager,
                meta:'Address of Manager',
                description:'The manager created this campaign and can create requests to withdraw money',
                style:{overflowWrap : 'break-word'}
            },
            {
                header:minimumContribution,
                meta:'Minimum of Contribution(Wei)',
                description:'You must contribute a least this much wei to become a approver',
                style:{overflowWrap : 'break-word'}
            },
            {
                header:requestCount,
                meta:'Number of Requests',
                description:' A request tries to withdraw from the contract. Requests must be approved by approvers',
                style:{overflowWrap : 'break-word'}
            },
            {
                header:approversCount,
                meta:'Number of Approvers',
                description:'Number of people who have already donated t Campaign',
                style:{overflowWrap : 'break-word'}
            },
            {
                header:web3.utils.fromWei(balance,'ether'),
                meta:'Campaign Balance (ether)',
                description:'The balance is hoow much money this campaign has left to spend',
                style:{overflowWrap : 'break-word'}
            }

        ];
        return <Card.Group items={item} />;

    }

    render(){
        return (
            <Layout>
                <h3>show cam</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                            
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                        <a>
                                            <Button primary>View REquests</Button>
                                        </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                </Grid> 
            </Layout>
        );
    }
}
export default CampaignShow;