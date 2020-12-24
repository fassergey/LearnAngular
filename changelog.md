## Introduction

    1. created project
    2. modified in package.json description of command 'start'
    3. created FirstComponent
    4. added properties to the FirstComponent. Output them in template
    5. created ProductComponent with click event handler on the button 'Buy'
    6. created ProductsService with method getProducts()
    7. created ProductListComponent
    8. created CartListComponent
    9. created CartService

## Components

    1. divided application onto modules
    2. delegated displaying goods responsibility to ProductComponent from ProductListComponent
    3. disable button 'Buy' when product is unavailable. Made ProductComponent presenting component
    4. modified CartService. Added number and sum of goods as get-properties
    5. modified CartListComponent in order to display number and sum of goods in the cart
    6. created CartItemComponent
    7. added template variable appTitle
    8. created HighlightDirective

## Services

    1. implemented interface of CartService
    2. created LocalStorageService
    3. created ConfigOptionsService
    4. created ConstantsService
    5. created GeneratorService, ConsolePrintService
    6. inject services into FirstComponent
    7. created ClickHandlerDirective
    8. implemented tests for created services in FirstComponent
    9. applied ClickHandlerDirective to FirstComponent's elements

## Pipes

    1. applied currency pipe to ProductComponent and CartItemComponent. Applied uppercase pipe to ProductComponent
    2. made getProducts return type observable. Applied async pipe to ProductListComponent
    3. created OrderByPipe
    4. registered OrderByPipe in Shared module
    5. added radio buttons to CartListComponent to change sorting order
    6. declare and export CommonModule from SharedModule

## Routing

    1. implemented routing for product list
    2. created page for product description
    3. implemented routing for cart
    4. added components orders
    5. implemented admin panel with CanActivate guard
    6. added resolve guard to product-form component
    7. applied lazy loading to admin module
    8. changed cart service to store cart items in the local storage

## HttpClient

    1. added json-server
    2. changed command start in package.json
    3. implemented AsyncProductsService
    4. implemented interceptor for requests which includes 'products'
    5. implemented AppSettingsService

## Ngrx

    1. created ProductsState and AppState.
    2. created products actions
    3. created products reducer
    4. created products selectors
    5. created products effects
    6. implemented navigation by actions in ProductComponent
    7. created composed selector getProductByUrl
    8. implemented state preloading guard
    9. implemented exist guard

## Forms

    1. Updated OrderFormComponent.
    2. Implemented validation: validator for firstClientName property and validating directive for email property.
    3. Added possibility to add several phones and remove any of them except the first.
    4. From validation messages in the class of component

## Unit Tests

    1. Created integrating tests (app & app-1) for AppComponent
    2. Created isolated tests for AppSettingsService
    3. Created isolated tests for OrderByPipe
    4. 
