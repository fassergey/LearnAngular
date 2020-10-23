# Introduction

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

### Services

    1. implemented interface of CartService
    2. created LocalStorageService
    3. created ConfigOptionsService
    4. created ConstantsService
    5. created GeneratorService
    6. inject services into FirstComponent
    7. 
