import { getNested, setNested } from '../src/lib/nested';

describe('getNested', () => {
  test('simple', () => {
    const source = {
      foo: 'value',
    };
    const key = 'foo';
    const result = getNested(source, key);
    expect(result).toBe('value');
  });

  test('nested', () => {
    const source = {
      foo: {
        bar: {
          baz: 'value'
        }
      }
    };
    const key = 'foo.bar.baz';
    const result = getNested(source, key);
    expect(result).toBe('value');
  });

  test('no hit', () => {
    const source = {
      foo: {
        bar: {
          baz: 'value'
        }
      }
    };
    const key = 'foo.bar.qux';
    const result = getNested(source, key);
    expect(result).toBeUndefined();
  });

  test('no hit', () => {
    const source = {
      foo: {
        bar: {
          baz: 'value'
        }
      }
    };
    const key = 'foo.bar.baz.qux';
    const result = getNested(source, key);
    expect(result).toBeUndefined();
  });

  test('no hit', () => {
    const source = {
      foo: {
        bar: {
          baz: 'value'
        }
      }
    };
    const key = 'foo.bar.baz.qux.qux';
    const result = getNested(source, key);
    expect(result).toBeUndefined();
  });
});

describe('setNested', () => {

  test('simple', () => {
    const source = {};
    const key = 'foo';
    const value = 'new value';
    setNested(source, key, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    expect((source as any).foo).toBe('new value');
  });

  test('simple update', () => {
    const source = {
      foo: 'value'
    };
    const key = 'foo';
    const value = 'new value';
    setNested(source, key, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    expect((source as any).foo).toBe('new value');
  });

  test('set nested', () => {
    const source = {};
    const key = 'foo.bar.baz';
    const value = 'new value';
    setNested(source, key, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    expect((source as any).foo.bar.baz).toBe('new value');
  });

  test('set nested update', () => {
    const source = {
      foo: {
        bar: {
          baz: 'value'
        }
      }
    };
    const key = 'foo.bar.baz';
    const value = 'new value';
    setNested(source, key, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    expect((source as any).foo.bar.baz).toBe('new value');
  });

  test('empty key', () => {
    const source = {
      foo: {
        bar: {
          baz: 'value'
        }
      }
    };
    const key = '';
    const value = 'new value';
    setNested(source, key, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    expect((source as any).foo.bar.baz).toBe('value');
  });

  test('empty source', () => {
    const source = 4;
    const key = 'foo.bar.baz';
    const value = 'new value';
    setNested(source, key, value);
    expect(source).toBe(4);
  });
});
