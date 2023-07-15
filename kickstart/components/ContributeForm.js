import React,{Component} from "react";
import { Button, Form,Input,Message ,Grid } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router } from '../routes'
class ContributeForm extends Component {

    state={
        value:'',
        errorMesage:'',
        loading:false
    };
    onSubmit= async(event)=>{
        event.preventDefault();

        const campaign=Campaign(this.props.address);
        this.setState({loading:true,errorMesage:''});
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
            .contribute()
            .send({
                from: accounts[0],
                value:web3.utils.toWei(this.state.value,'ether')
    
            });
    
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        }catch(err){
            this.setState({errorMesage:err.message});
    
        }

        this.setState({loading:false,value:''});
    };

    render(){
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMesage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                <Input 
                    value={this.state.value}
                    label="ether"
                    labelPosition="right" 
                    onChange={event=> this.setState({value:event.target.value})}/>
                </Form.Field>
                <Message error header="Oops !" content={this.state.errorMesage} />
                <Button loading={this.state.loading } primary>Contribute !</Button>
            </Form>
        );

    }
}

export default ContributeForm;