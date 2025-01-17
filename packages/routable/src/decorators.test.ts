import {Component, primaryIdentifier} from '@layr/component';

import {Routable} from './routable';
import {route} from './decorators';
import {isRouteInstance} from './route';

describe('Decorators', () => {
  test('@route()', async () => {
    class Movie extends Routable(Component) {
      @primaryIdentifier() id!: string;

      @route('/movies', {aliases: ['/films']}) static ListPage() {
        return `All movies`;
      }

      // Use a getter to simulate the view() decorator
      @route('/movies/:id', {aliases: ['/films/:id']}) get ItemPage() {
        return function (this: Movie) {
          return `Movie #${this.id}`;
        };
      }
    }

    // --- Class routes ---

    const listPageRoute = Movie.getRoute('ListPage');

    expect(isRouteInstance(listPageRoute)).toBe(true);
    expect(listPageRoute.getName()).toBe('ListPage');
    expect(listPageRoute.getPattern()).toBe('/movies');
    expect(listPageRoute.getAliases()).toEqual(['/films']);
    expect(listPageRoute.matchURL('/movies')).toEqual({});
    expect(listPageRoute.matchURL('/films')).toEqual({});
    expect(listPageRoute.generateURL()).toBe('/movies');

    expect(Movie.ListPage.matchURL('/movies')).toEqual({});
    expect(Movie.ListPage.matchURL('/films')).toEqual({});
    expect(Movie.ListPage.generateURL()).toBe('/movies');

    // --- Prototype routes ---

    const itemPageRoute = Movie.prototype.getRoute('ItemPage');

    expect(isRouteInstance(itemPageRoute)).toBe(true);
    expect(itemPageRoute.getName()).toBe('ItemPage');
    expect(itemPageRoute.getPattern()).toBe('/movies/:id');
    expect(itemPageRoute.getAliases()).toEqual(['/films/:id']);
    expect(itemPageRoute.matchURL('/movies/abc123')).toEqual({id: 'abc123'});
    expect(itemPageRoute.matchURL('/films/abc123')).toEqual({id: 'abc123'});
    expect(itemPageRoute.generateURL({id: 'abc123'})).toBe('/movies/abc123');

    expect(Movie.prototype.ItemPage.matchURL('/movies/abc123')).toEqual({id: 'abc123'});
    expect(Movie.prototype.ItemPage.matchURL('/films/abc123')).toEqual({id: 'abc123'});
    expect(Movie.prototype.ItemPage.generateURL({id: 'abc123'})).toBe('/movies/abc123');

    // --- Instance routes ---

    const movie = new Movie({id: 'abc123'});

    expect(movie.ItemPage.generateURL()).toBe('/movies/abc123');
    expect(movie.ItemPage.generateURL({id: 'def456'})).toBe('/movies/def456');
  });
});
