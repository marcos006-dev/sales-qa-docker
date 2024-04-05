<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    LanguageController, RawMaterialController, EcommerceController, OmnichannelController, CrmController, InvoiceController,
    ClientController, AccountingController, StoreController, RoleController, SupplierController, SupplierOrderController,
    ProductController, ProductCategoryController, OrderController, CartController, CheckoutController
};

// Cambio de Idioma
Route::get('lang/{locale}', [LanguageController::class, 'swap']);

// Autenticación y Verificación de Email
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/', function () {
        return view('content.dashboard.dashboard-mvd');
    })->name('dashboard');

    // Dashboard Data Tables
    Route::get('/clients/datatable', [ClientController::class, 'datatable'])->name('clients.datatable');
    Route::get('/products/datatable', [ProductController::class, 'datatable'])->name('products.datatable');
    Route::get('/product-categories/datatable', [ProductCategoryController::class, 'datatable'])->name('product-categories.datatable');
    Route::get('/orders/datatable', [OrderController::class, 'datatable'])->name('orders.datatable');


    // Recursos con acceso autenticado
    Route::resources([
        'stores' => StoreController::class,
        'roles' => RoleController::class,
        'raw-materials' => RawMaterialController::class,
        'suppliers' => SupplierController::class,
        'supplier-orders' => SupplierOrderController::class,
        'clients' => ClientController::class,
        'products' => ProductController::class,
        'product-categories' => ProductCategoryController::class,
        'orders' => OrderController::class,
        'invoices' => InvoiceController::class,
    ]);

    // Stores
    Route::prefix('stores/{store}')->name('stores.')->group(function () {
        Route::get('manage-users', [StoreController::class, 'manageUsers'])->name('manageUsers');
        Route::post('associate-user', [StoreController::class, 'associateUser'])->name('associateUser');
        Route::post('disassociate-user', [StoreController::class, 'disassociateUser'])->name('disassociateUser');
    });

    // Roles
    Route::prefix('roles/{role}')->name('roles.')->group(function () {
        Route::get('manage-users', [RoleController::class, 'manageUsers'])->name('manageUsers');
        Route::post('associate-user', [RoleController::class, 'associateUser'])->name('associateUser');
        Route::post('disassociate-user', [RoleController::class, 'disassociateUser'])->name('disassociateUser');
        Route::get('manage-permissions', [RoleController::class, 'managePermissions'])->name('managePermissions');
        Route::post('assign-permissions', [RoleController::class, 'assignPermissions'])->name('assignPermissions');
    });

    // Variaciones
    Route::get('product-attributes', [ProductController::class, 'attributes'])->name('product-attributes');
    Route::post('product-attributes', [ProductController::class, 'storeAttributes'])->name('product-attributes.store');

    // CRM, Contabilidad y Otros
    Route::get('crm', [CrmController::class, 'index'])->name('crm');
    Route::get('receipts', [AccountingController::class, 'receipts'])->name('receipts');
    Route::get('entries', [AccountingController::class, 'entries'])->name('entries');
    Route::get('entrie', [AccountingController::class, 'entrie'])->name('entrie');

    // E-Commerce Backoffice
    Route::get('/ecommerce/marketing', [EcommerceController::class, 'marketing'])->name('marketing');
    Route::get('/ecommerce/settings', [EcommerceController::class, 'settings'])->name('settings');

});

// Rutas de E-Commerce (Públicas)
Route::get('shop', [EcommerceController::class, 'index'])->name('shop');
Route::get('store/{storeId}', [EcommerceController::class, 'store'])->name('store');
Route::post('/cart/select-store', [CartController::class, 'selectStore'])->name('cart.selectStore');
Route::post('/cart/add/{productId}', [CartController::class, 'addToCart'])->name('cart.add');
Route::get('/session/clear', [CartController::class, 'clearSession'])->name('session.clear');
Route::resource('checkout', CheckoutController::class);
Route::get('/checkout/success/{order}', [CheckoutController::class, 'success'])->name('checkout.success');


// Omnicanalidad (Público)
Route::get('omnichannel', [OmnichannelController::class, 'index'])->name('omnichannel');
