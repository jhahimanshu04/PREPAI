// models/InterviewReport.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './usermodel.js';

const InterviewReport = sequelize.define('InterviewReport', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Job title is required' },
      notEmpty: { msg: 'Job title is required' },
    },
  },
  jobDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Job description is required' },
      notEmpty: { msg: 'Job description is required' },
    },
  },
  resume: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  selfDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  matchScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
    },
  },
  technicalQuestions: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
  },
  behavioralQuestions: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
  },
  skillGaps: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
  },
  preparationPlan: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
  },
  userId: {
    type: DataTypes.INTEGER, // ✅ changed from UUID to INTEGER
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'InterviewReports',
});

InterviewReport.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(InterviewReport, { foreignKey: 'userId', as: 'reports' });

export default InterviewReport;