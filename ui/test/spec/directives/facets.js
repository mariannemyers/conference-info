'use strict';

describe('Directive: facets', function () {
  var scope, element;

  beforeEach(module('sample', 'app-templates'));

  beforeEach(inject( function($compile, $rootScope) {
    element = '<facets facet-list="model.search.facets" selected="model.selected"/>';
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    scope = element.isolateScope();

    angular.extend(scope, {
      facets: [],
      selected: []
    });
  }));

  it('should create facet list element', function() {
    expect(element.html()).toContain('class="facet-list"');
  });

  it('should display facets', function() {
    expect( $( element ).find('.facet div').length ).toBe(0);

    scope.facets = {
      feature: {
        facetValues: ['forms'],
        type: 'xs:string'
      }
    };
    scope.$digest();

    expect( $( element ).find('.facet div').length ).toBe(1);
  });

  it('should display selected facets', function() {
    expect( $( element ).find('.chiclets div').length ).toBe(0);

    scope.selected = [
      {
        name: 'feature',
        value: 'buttons'
      }
    ];
    scope.$digest();

    expect( $( element ).find('.chiclets div').length ).toBe(1);
  });

});
