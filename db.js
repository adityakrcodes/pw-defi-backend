const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/defi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


// Users Schema
const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  wallet_address: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Wallets Schema
const WalletSchema = new Schema({
  wallet_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User'
  },
  balance: {
    type: Number,
    default: 0
  },
  public_key: {
    type: String,
    required: true,
    unique: true
  },
  private_key_hash: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Transactions Schema
const TransactionSchema = new Schema({
  transaction_id: {
    type: String,
    required: true,
    unique: true
  },
  from_wallet_id: {
    type: String,
    required: true,
    ref: 'Wallet'
  },
  to_wallet_id: {
    type: String,
    required: true,
    ref: 'Wallet'
  },
  token_id: {
    type: String,
    required: true,
    ref: 'Token'
  },
  amount: {
    type: Number,
    required: true
  },
  transaction_fee: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Tokens Schema
const TokenSchema = new Schema({
  token_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  total_supply: {
    type: Number,
    required: true
  },
  contract_address: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Governance Schema
const GovernanceSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'passed', 'rejected', 'expired'],
    default: 'active'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  proposal_id: {
    type: String,
    required: true,
    unique: true
  },
  voting_end_date: {
    type: Date,
    required: true
  }
});

// Votes Schema
const VoteSchema = new Schema({
  vote_id: {
    type: String,
    required: true,
    unique: true
  },
  proposal_id: {
    type: String,
    required: true,
    ref: 'Governance'
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User'
  },
  vote_type: {
    type: String,
    enum: ['for', 'against', 'abstain'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Loans Schema
const LoanSchema = new Schema({
  loan_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User'
  },
  token_id: {
    type: String,
    required: true,
    ref: 'Token'
  },
  amount: {
    type: Number,
    required: true
  },
  interest_rate: {
    type: Number,
    required: true
  },
  collateral_amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'repaid', 'defaulted', 'liquidated'],
    default: 'active'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  due_date: {
    type: Date,
    required: true
  }
});

// Stakings Schema
const StakingSchema = new Schema({
  staking_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User'
  },
  token_id: {
    type: String,
    required: true,
    ref: 'Token'
  },
  amount: {
    type: Number,
    required: true
  },
  staking_period: {
    type: Number,  // Duration in days
    required: true
  },
  reward_rate: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'withdrawn'],
    default: 'active'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create and export models
const User = mongoose.model('User', UserSchema);
const Wallet = mongoose.model('Wallet', WalletSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);
const Token = mongoose.model('Token', TokenSchema);
const Governance = mongoose.model('Governance', GovernanceSchema);
const Vote = mongoose.model('Vote', VoteSchema);
const Loan = mongoose.model('Loan', LoanSchema);
const Staking = mongoose.model('Staking', StakingSchema);

module.exports = {
  User,
  Wallet,
  Transaction,
  Token,
  Governance,
  Vote,
  Loan,
  Staking,
  db
};