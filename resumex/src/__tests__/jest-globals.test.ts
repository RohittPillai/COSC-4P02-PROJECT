// This file is just to check that Jest globals are properly recognized

describe('Jest Globals', () => {
  it('should have proper TypeScript support', () => {
    // Test TypeScript support for Jest globals
    expect(1 + 1).toBe(2);
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(null).toBeNull();
  });

  test('can use `test` keyword too', () => {
    // Both `it` and `test` should work
    expect('hello').toEqual('hello');
  });

  // Lifecycle methods should work
  beforeAll(() => {
    console.log('Setting up test suite');
  });

  afterAll(() => {
    console.log('Cleaning up test suite');
  });

  beforeEach(() => {
    // Do something before each test
  });

  afterEach(() => {
    // Do something after each test
  });
}); 