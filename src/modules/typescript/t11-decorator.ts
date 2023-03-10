function enumerable(isEnumerable = true) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = isEnumerable;
  };
}

interface ControllerParams {
  database: string;
  basePath: string;
}

function Controller(params: ControllerParams) {
  return function (target: any) {
    if (!('__config' in target)) {
      Object.defineProperty(target, '__config', {
        value: {
          routes: [],
        },
        enumerable: false,
      });
    }

    Object.assign(target['__config'], params);
  };
}

function Get(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!('__config' in target.constructor)) {
      Object.defineProperty(target.constructor, '__config', {
        value: {
          routes: [],
        },
        enumerable: false,
      });
    }

    const controllerConfig = target.constructor['__config'];

    controllerConfig.routes.push({
      path,
      method: propertyKey,
    });
  };
}

@Controller({
  basePath: '/category',
  database: 'mongo',
})
class Category {
  id!: string;

  @Get('/')
  find() {
    console.log('tata');
  }
}

export function t11() {
  console.log('config', (Category as any).__config);
  const toto = new Category();

  for (const key in toto) {
    console.log(key);
  }
}
