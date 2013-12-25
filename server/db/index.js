var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

// common schemas
var logSchema = new Schema({
  date:       { type: Date, required: true },
  message:    { type: String, required: true }
});

// family and contacts
var phoneNumberSchema = new Schema({
  type:   String,
  number: String
}, { _id: false });

var contactSchema = new Schema({
  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  type:         { type: String, required: true, enum: ['Parent', 'Guardian'], default: 'Parent'},
  email:        { type: String },
  phoneNumbers: [ phoneNumberSchema ],
  address: {
    street1:  String,
    street2:  String,
    city:     String,
    state:    String,
    zip:      String
  }
});

var studentSchema = new Schema({
  firstName:        { type: String, required: true },
  lastName:         { type: String, required: true },
  graduatingClass:  { type: Schema.Types.ObjectId, required: true, ref:'Class' }
});

var eventSchema = new Schema({
  date:         { type: Date, required: true },
  type:         { type: String, required: true },
  description:  { type: String, required: true }
});

var familySchema = new Schema({
  name:       { type: String, required: true, unique: true},
  status:     { type: String, required: true, enum: [ 'New', 'Waitlist', 'Active', 'Alumni', 'Exited' ] },
  contacts:   [ contactSchema ],
  students:   [ studentSchema ],
  events:     [ eventSchema ],
  logs:       [ logSchema ],
  updatedAt:  { type: Date,   required: true },
  createdAt:  { type: Date,   required: true }
});

// classes
var classSchema = new Schema({
  name:           { type: String, required: true, unique: true },
  firstYear:      { type: String, required: true },
  graduationYear: { type: String, required: true }
});

// config
var configSchema = new Schema({
  key:    { type: String, required: true, unique: true },
  value:  { type: Schema.Types.Mixed },
  logs:   [ logSchema ]
});

// export models
var Family = mongoose.model('Family', familySchema);
var Config = mongoose.model('Config', configSchema);
var Class  = mongoose.model('Class', classSchema);

module.exports = {
  Family: Family,
  Config: Config,
  Class: Class
};
