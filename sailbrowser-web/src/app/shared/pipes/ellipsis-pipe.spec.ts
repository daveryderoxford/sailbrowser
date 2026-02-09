
import { TestBed } from '@angular/core/testing';
import { describe, expect } from 'vitest';
import { EllipsisPipe } from './ellipsis-pipe';

describe( 'EllipsisPipe', () => {
   beforeEach( () => TestBed.configureTestingModule( {} ) );

   it( 'should return string if max lenght is not eceeded', () => {
      const pipe = new EllipsisPipe();
      const result = pipe.transform( '123456789', 10 );
      expect( result ).toEqual( '123456789' );

   } );
   it( 'should terminate string with ellipsis if max lenght is exceeded', () => {
      const pipe = new EllipsisPipe(); 
      const result = pipe.transform('123456789', 3);
      expect( result ).toBe( '123...' );

   } );

   it( 'should return null if max lenght is not defined', () => {
      const pipe = new EllipsisPipe();
      const result = pipe.transform( null, 3 );
      expect(result).toBeNull();

   } );

   it( 'should terminate string with ellipsis if it exceeds count ', () => {
      const pipe = new EllipsisPipe();
      const result = pipe.transform( '123456789', undefined );
      expect( result ).toBe( '123456789' );
   } );
} );