import { ComponentFixture } from '@angular/core/testing';
import { MockedComponentFixture } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { Type } from '@angular/core';

export function getTestIdSelector(testId: string): string {
  return `[data-testId="${testId}"]`;
}

export function queryByCss<T>(
  fixture: ComponentFixture<T> | MockedComponentFixture<T>,
  selector: string
) {
  return fixture.debugElement.query(By.css(selector));
}

export function queryByCssStrict<T>(
  fixture: ComponentFixture<T> | MockedComponentFixture<T>,
  selector: string
) {
  const debugElement = queryByCss(fixture, selector);
  if (!debugElement)
    throw new Error(
      `queryByCssStrict: Element with ${selector} was not found.`
    );
  return debugElement;
}

export function findEl<T>(
  fixture: ComponentFixture<T> | MockedComponentFixture<T>,
  testId: string
) {
  return queryByCss(fixture, getTestIdSelector(testId));
}

export function findElStrict<T>(
  fixture: ComponentFixture<T> | MockedComponentFixture<T>,
  testId: string
) {
  return queryByCssStrict(fixture, getTestIdSelector(testId));
}

export function findDirective<T>(
  fixture: ComponentFixture<T> | MockedComponentFixture<T>,
  type: Type<unknown>
) {
  return fixture.debugElement.query(By.directive(type));
}
