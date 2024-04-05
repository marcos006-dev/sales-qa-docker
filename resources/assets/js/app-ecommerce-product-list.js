/**
 * app-ecommerce-product-list
 */

'use strict';

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_product_table = $('.datatables-products'),
    productAdd = baseUrl + 'products/create'

  // E-commerce Products datatable

  if (dt_product_table.length) {
    var dt_products = dt_product_table.DataTable({
      ajax: 'products/datatable',
      columns: [
        // columns according to JSON
        { data: 'image' },
        { data: 'name' },
        { data: 'sku' },
        {
          data: 'description',
          render: function(data, type, row) {
            var div = document.createElement("div");
            div.innerHTML = data;
            return div.textContent || div.innerText || "";
          }
        },
        { data: 'type' },
        { data: 'old_price' },
        { data: 'price' },
        { data: 'category' },
        { data: 'store_name'},
        { data: ''}
      ],
      columnDefs: [
        {
            // Actions
            targets: -1,
            title: 'Acciones',
            searchable: false,
            orderable: false,
            render: function (data, type, full, meta) {
                return (
                    '<div class="d-inline-block text-nowrap">' +
                    '<button class="btn btn-sm btn-icon"><i class="bx bx-edit"></i></button>' +
                    '<button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded me-2"></i></button>' +
                    '<div class="dropdown-menu dropdown-menu-end m-0">' +
                    '<a href="javascript:0;" class="dropdown-item">View</a>' +
                    '<a href="javascript:0;" class="dropdown-item">Suspend</a>' +
                    '</div>' +
                    '</div>'
                );
            }
        },
        {
            targets: 0, // Assuming the 'image' column is the first one
            title: 'Imagen',
            render: function(data, type, full, meta) {
                return '<img src="' + data + '" alt="Imagen del producto" style="max-width: 100px; max-height: 100px;">';
            }
        },
        {
            targets: 5,
            render: function(data, type, full, meta) {
                return '$' + data;
            }
        },
        {
          targets: 6,
          render: function(data, type, full, meta) {
              if (data !== null) {
                  return '$' + data;
              } else {
                  return '-';
              }
          }
        },
        {
          targets: 4, // Assuming 'type' is the 5th column (0-based index)
          render: function(data, type, full, meta) {
              if (data.toLowerCase() === 'configurable') {
                  return 'Variable';
              } else {
                  return data.charAt(0).toUpperCase() + data.slice(1);
              }
          }
        }

      ],

      order: [2, 'asc'], //set any columns order asc/desc
      dom:
        '<"card-header d-flex border-top rounded-0 flex-wrap py-md-0"' +
        '<"me-5 ms-n2 pe-5"f>' +
        '<"d-flex justify-content-start justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex align-items-start align-items-md-center justify-content-sm-center mb-3 mb-sm-0"lB>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      lengthMenu: [7, 10, 20, 50, 70, 100], //for length of menu
      language: {
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'Buscar producto',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ productos'
      },
      // Buttons with Dropdown
      buttons: [
        {
          text: '<i class="bx bx-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Añadir producto</span>',
          className: 'add-new btn btn-primary',
          action: function () {
            window.location.href = productAdd;
          }
        }
      ],

      initComplete: function () {
        // Adding type filter once table initialized
        this.api()
          .columns(4) // Assuming 'tipo' column is at index 4
          .every(function () {
            var column = this;
            var select = $(
              '<select id="ProductType" class="form-select text-capitalize"><option value="">Tipo</option></select>'
            )
              .appendTo('.product_type')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>');
              });
          });
        // Adding category filter once table initialized
        this.api()
          .columns(-3)
          .every(function () {
              var column = this;
              var select = $('<select class="form-select text-capitalize"><option value="">Categoría</option></select>')
                  .appendTo('.product_category')
                  .on('change', function () {
                      var val = $.fn.dataTable.util.escapeRegex($(this).val());
                      column.search(val ? '^' + val + '$' : '', true, false).draw();
                  });

              column
                  .data()
                  .unique()
                  .sort()
                  .each(function (d, j) {
                      select.append('<option value="' + d + '">' + d + '</option>');
                  });
          });
          // Adding store filter once table initialized
          this.api()
          .columns(-2)
          .every(function () {
              var column = this;
              var select = $(
                  '<select id="ProductStore" class="form-select text-capitalize"><option value="">Local</option></select>'
              )
              .appendTo('.product_store')
              .on('change', function () {
                  var val = $.fn.dataTable.util.escapeRegex($(this).val());
                  column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

              column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                  select.append('<option value="' + d + '">' + d + '</option>');
              });
          });
    }

    });
    $('.dataTables_length').addClass('mt-0 mt-md-3 me-3');
    // To remove default btn-secondary in export buttons
    $('.dt-buttons > .btn-group > button').removeClass('btn-secondary');
    $('.dt-buttons').addClass('d-flex flex-wrap');
    $('.dataTables_length label select').addClass('form-select form-select-sm');
    $('.dataTables_filter label input').addClass('form-control');
  }

  // Delete Record
  $('.datatables-products tbody').on('click', '.delete-record', function () {
    dt_products.row($(this).parents('tr')).remove().draw();
  });

  // Toggle column visibility based on switches
  $('.toggle-column').on('change', function() {
    var column = dt_products.column($(this).data('column'));
    column.visible(!column.visible());
  });


});
