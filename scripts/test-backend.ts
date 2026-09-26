// Script to test backend server action validation, duplicate detection, token lookup, and error handling
import { registerAction, getRegistrationByToken } from '../app/actions/register';

async function runTests() {
  console.log('=== STARTING BACKEND API TESTS ===\n');

  let passedTests = 0;
  let totalTests = 0;

  // Test 1: Empty form data validation
  totalTests++;
  console.log('[Test 1] Testing validation with empty FormData...');
  const emptyFormData = new FormData();
  emptyFormData.append('member_count', '1');
  const res1 = await registerAction(null, emptyFormData);
  if (!res1.success && res1.message?.includes('Validation failed') && res1.errors) {
    console.log('✅ Passed Test 1: Zod validation caught missing fields as expected.');
    console.log('   Errors detected:', Object.keys(res1.errors).join(', '));
    passedTests++;
  } else {
    console.error('❌ Failed Test 1:', res1);
  }

  // Test 2: Invalid phone number format
  totalTests++;
  console.log('\n[Test 2] Testing validation with invalid phone number...');
  const invalidPhoneFormData = new FormData();
  invalidPhoneFormData.append('member_count', '1');
  invalidPhoneFormData.append('team_name', 'CyberDevs');
  invalidPhoneFormData.append('m0_name', 'Aryan');
  invalidPhoneFormData.append('m0_email', 'aryan@example.com');
  invalidPhoneFormData.append('m0_phone', '12345'); // invalid: not 10 digits
  invalidPhoneFormData.append('m0_roll', 'CS101');
  invalidPhoneFormData.append('m0_institution', 'Tech University');
  invalidPhoneFormData.append('m0_year', '2nd Year');
  invalidPhoneFormData.append('m0_branch', 'CSE');
  
  const res2 = await registerAction(null, invalidPhoneFormData);
  if (!res2.success && res2.message?.includes('Validation failed')) {
    console.log('✅ Passed Test 2: Invalid phone number was rejected.');
    console.log('   Response message:', res2.message);
    passedTests++;
  } else {
    console.error('❌ Failed Test 2:', res2);
  }

  // Test 3: Duplicate emails within team
  totalTests++;
  console.log('\n[Test 3] Testing duplicate emails within the same team submission...');
  const dupEmailFormData = new FormData();
  dupEmailFormData.append('member_count', '2');
  dupEmailFormData.append('team_name', 'DualCore');
  dupEmailFormData.append('m0_name', 'Alice');
  dupEmailFormData.append('m0_email', 'same@example.com');
  dupEmailFormData.append('m0_phone', '9876543210');
  dupEmailFormData.append('m0_roll', 'CS101');
  dupEmailFormData.append('m0_institution', 'Tech University');
  dupEmailFormData.append('m0_year', '2nd Year');
  dupEmailFormData.append('m0_branch', 'CSE');

  dupEmailFormData.append('m1_name', 'Bob');
  dupEmailFormData.append('m1_email', 'same@example.com'); // duplicate!
  dupEmailFormData.append('m1_phone', '9876543211');
  dupEmailFormData.append('m1_roll', 'CS102');
  dupEmailFormData.append('m1_institution', 'Tech University');
  dupEmailFormData.append('m1_year', '2nd Year');
  dupEmailFormData.append('m1_branch', 'IT');

  const res3 = await registerAction(null, dupEmailFormData);
  if (!res3.success && res3.message === 'Duplicate emails found within the team submission.') {
    console.log('✅ Passed Test 3: Duplicate email detection triggered correctly.');
    console.log('   Response message:', res3.message);
    passedTests++;
  } else {
    console.error('❌ Failed Test 3:', res3);
  }

  // Test 4: Invalid / Empty token lookup
  totalTests++;
  console.log('\n[Test 4] Testing getRegistrationByToken with empty/invalid token...');
  const res4 = await getRegistrationByToken('');
  const res4b = await getRegistrationByToken('    ');
  if (!res4.success && res4.message === 'Invalid token' && !res4b.success) {
    console.log('✅ Passed Test 4: Invalid token cleanly rejected.');
    passedTests++;
  } else {
    console.error('❌ Failed Test 4:', res4);
  }

  // Test 5: Full valid submission attempt with dummy DB connection
  totalTests++;
  console.log('\n[Test 5] Testing valid submission gracefully handling dummy database credentials...');
  const validFormData = new FormData();
  validFormData.append('member_count', '1');
  validFormData.append('team_name', 'QuantumCoders');
  validFormData.append('m0_name', 'Aryan');
  validFormData.append('m0_email', 'aryan.valid@test.edu');
  validFormData.append('m0_phone', '9876543210');
  validFormData.append('m0_roll', '2023CS001');
  validFormData.append('m0_institution', 'National Institute of Technology');
  validFormData.append('m0_year', '2nd Year');
  validFormData.append('m0_branch', 'Computer Science');

  const res5 = await registerAction(null, validFormData);
  // With dummy credentials, database query will reject and server action returns friendly database error
  if (!res5.success && res5.message?.includes('Database Error')) {
    console.log('✅ Passed Test 5: DB call cleanly caught connection error without crashing the server.');
    console.log('   Error response returned to client:', res5.message);
    passedTests++;
  } else {
    console.log('Result for Test 5:', res5);
  }

  console.log(`\n=== TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===\n`);
}

runTests().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
