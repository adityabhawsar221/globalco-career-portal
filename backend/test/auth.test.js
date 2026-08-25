import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword, dbService } from '../db.js';

test('hashPassword creates a hash that can be verified', async () => {
  const password = 'MySecurePass123';
  const hash = await hashPassword(password);

  assert.notEqual(hash, password);
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword('WrongPass', hash), false);
});

test('register and application status workflow works for candidate and recruiter', async () => {
  const candidate = await dbService.registerUser({
    name: 'Aditya',
    username: 'aditya21',
    password: 'xyz123',
    role: 'candidate'
  });

  assert.ok(candidate.token);
  assert.equal(candidate.user.username, 'aditya21');

  const job = await dbService.createJob({
    title: 'Software Developer (Onsite)',
    company: 'GlobalCo',
    category: 'Software Development',
    location: 'Hyderabad, India (Onsite)',
    locationType: 'Onsite',
    jobType: 'Full-Time',
    salaryMin: 1200000,
    salaryMax: 2000000,
    description: 'Build scalable web platforms and CI/CD pipelines',
    employerEmail: 'careers@globalco.com',
    tags: ['React', 'Node.js', 'CI/CD'],
    requirements: ['React', 'Node.js', 'CI/CD'],
    perks: ['Health Insurance', 'Learning Allowance']
  });

  const app = await dbService.createApplication({
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    applicantName: candidate.user.name,
    applicantEmail: `${candidate.user.username}@example.com`,
    applicantPhone: '+919999999999',
    experienceYears: '3',
    coverLetter: 'I am excited to apply',
    candidateId: candidate.user.id,
    userId: candidate.user.id,
    status: 'Applied'
  });

  assert.equal(app.status, 'Applied');

  const updated = await dbService.updateApplicationStatus(app.id, 'Shortlisted');
  assert.equal(updated.status, 'Shortlisted');

  const candidateApps = await dbService.getApplicationsForUser(candidate.user.id);
  assert.equal(candidateApps.length >= 1, true);
});
