import {BranchMockGenerator} from "@domain/types/__mock__/branch-generator";
import {faker} from "@faker-js/faker";

describe('BranchMockGenerator', () => {
  it('should generate one', () => {
    const mockGenerator = new BranchMockGenerator();
    const result = mockGenerator.generateOne();
    expect(result).toBeTruthy();
  });

  it('should generate many', () => {
    const mockGenerator = new BranchMockGenerator();
    const result = mockGenerator.generateMany(10);
    expect(result).toBeTruthy();
    expect(result.length).toBe(10);
  });
  it('should generate many with id', () => {
    const mockGenerator = new BranchMockGenerator();
    const result = mockGenerator.generateMany(10);
    expect(result).toBeTruthy();
    expect(result.length).toBe(10);
    expect(result[0].id).toBe(0);
  });
    it('should generate one with id', () => {
      const mockGenerator = new BranchMockGenerator();
      const result = mockGenerator.generateOne(1);
      expect(result).toBeTruthy();
      expect(result.id).toBe(1);
    });
    it('should generate valid entities.', () => {
      const mockGenerator = new BranchMockGenerator();
      const result = mockGenerator.generateMany(10);
      expect(result).toBeTruthy();
      expect(result.length).toBe(10);
      expect(result[0].id).toBe(0);
      expect(result[0].name).toBeTruthy();
      expect(result[0].description).toBeTruthy();
      expect(result[0].address).toBeTruthy();
      expect(result[0].createdAt).toBeTruthy();
      expect(result[0].updatedAt).toBeTruthy();
      expect(result[0].email).toBeTruthy();
      expect(result[0].phone).toBeTruthy();
    });
    it('should generate valid entity.', () => {
      const mockGenerator = new BranchMockGenerator();
      const id = faker.datatype.number();
      const result = mockGenerator.generateOne(id);
      expect(result).toBeTruthy();
      expect(result.id).toBe(id);
      expect(result.name).toBeTruthy();
      expect(result.description).toBeTruthy();
      expect(result.address).toBeTruthy();
      expect(result.createdAt).toBeTruthy();
      expect(result.updatedAt).toBeTruthy();
      expect(result.email).toBeTruthy();
      expect(result.phone).toBeTruthy();
    });
});
