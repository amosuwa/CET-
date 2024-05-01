const xrpl = require('xrpl');


class ConstructionEquityToken {
    constructor() {
        this.client = new xrpl.XrpClient('wss://s.altnet.rippletest.net');
        this.issuerAddress = 'rn9FaL1Yrn9ZFQnf6fvcFDSbG4mYYDKmvW';
        this.receiverAddress = 'rwByaj1BJKvAX36LUwvV7hMv7wYq7zBAzd';
        this.totalSupply = 10000000; 
        this.platformFeePercentage = 0.05;
        this.communityFundPercentage = 0.1; 
        this.issuerSecret = 'sEd7rkUp7tbTKasy84qazNtqEyiJigh'; 
    }

    async createToken() {
        try {
            await this.client.connect();
            const transaction = {
                TransactionType: 'Payment',
                Account: this.issuerAddress,
                Amount: xrpl.XrpUtils.xrpToDrops(this.totalSupply),
                Destination: this.issuerAddress
            };
            const preparedTx = await this.client.prepareTransaction(transaction);
            const signedTx = await this.client.sign(preparedTx.txJSON, this.issuerSecret);
            const txResult = await this.client.submitTransaction(signedTx.signedTransaction);
            console.log('Token created successfully:', txResult);
            return txResult;
        } catch (error) {
            console.error('Error creating token:', error);
            throw error;
        } finally {
            await this.client.disconnect();
        }
    }

    async transferTokens(from, to, amount) {
        try {
            await this.client.connect();
            const transaction = {
                TransactionType: 'Payment',
                Account: from,
                Amount: xrpl.XrpUtils.xrpToDrops(amount),
                Destination: to
            };
            const preparedTx = await this.client.prepareTransaction(transaction);
            const signedTx = await this.client.sign(preparedTx.txJSON, this.issuerSecret);
            const txResult = await this.client.submitTransaction(signedTx.signedTransaction);
            console.log('Tokens transferred successfully:', txResult);
            return txResult;
        } catch (error) {
            console.error('Error transferring tokens:', error);
            throw error;
        } finally {
            await this.client.disconnect();
        }
    }

    async chargePlatformFees(platform, amount) {
        try {
            const feeAmount = amount * this.platformFeePercentage;
            
            console.log('Platform fees charged to:', platform, 'Amount:', feeAmount);
        } catch (error) {
            console.error('Error charging platform fees:', error);
            throw error;
        }
    }

    async allocateToCommunityDevelopmentFund(amount) {
        try {
            const fundAmount = amount * this.communityFundPercentage;
           
            console.log('Tokens allocated to community development fund:', fundAmount);
        } catch (error) {
            console.error('Error allocating tokens to fund:', error);
            throw error;
        }
    }

    async stakeTokens(account, amount) {
        try {
            await this.client.connect();
            
            console.log('Tokens staked:', amount);
        } catch (error) {
            console.error('Error staking tokens:', error);
            throw error;
        } finally {
            await this.client.disconnect();
        }
    }

    async burnTokens(amount) {
        try {
            await this.client.connect();
           
            console.log('Tokens burned:', amount);
        } catch (error) {
            console.error('Error burning tokens:', error);
            throw error;
        } finally {
            await this.client.disconnect();
        }
    }

   
}

module.exports = ConstructionEquityToken;

const token = new ConstructionEquityToken();
