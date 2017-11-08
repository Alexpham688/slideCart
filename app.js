$(function(){
  //moving cart upon mouse over items
  $('#container').on('mousemove', function(e){
    var windowWidth = $(window).width();
    var cartWidth = $('.product').length * 200;
    if(windowWidth < cartWidth)
      $('.cart').stop(false,true).animate({
        left: - (e.clientX / windowWidth) * (cartWidth - windowWidth)
      });
      else
      $('.cart').stop(false, true)
        .css({ left: 0
        });
      });
      //adding items to cart
      $('.plus').on('click', function() {
        var prod = $(this).closest('.product');
        var quan = prod.data('quantity')  + 1;
        prod.data('quantity', quan);
        updateProduct(prod)
      });
      //removing items from cart
      $('.minus').on('click',function() {
        var prod = $(this).closest('.product');
        var quan = Math.max(1,prod.data('quantity') - 1);
        prod.data('quantity', quan);
        updateProduct(prod);
      });
      //deleting grocery item
      $('.delete').on('click', function(){
        var prod = $(this).closest('.product');
        prod.hide('blind', { direction: 'left'}, 1000, function() {
          prod.remove();
          updateProduct(prod);
          if($('.product').length === 0 ) {
            $('#container .cart').hide();
            $('#container .empty').show();
          }
        });
      });
      //updating product functionality
      function updateProduct(prod) {
        var quan = prod.data('quantity');
        var price = prod.data('price');
        $('.product-quantity', prod).html('<span class="x"> x </span>' + quan);
        $('.product-price', prod).html('$ ' + (price * quan).toFixed(2));
        updateBill();
      }
      //updating bill functionality
      function updateBill() {
        var subtotal = 0;
        var salestax = 0;
        var shipping = 5;
        var total = 0;
        $('.product').each(function() {
          subtotal += $(this).data('quantity') * $(this).data('price');
        });
        //updating pricing
        salestax = subtotal * 0.06;
        total = subtotal + salestax + shipping;
        $('.subtotal .value').html('$ ' + subtotal.toFixed(2));
        $('.salestax .value').html('$ ' + salestax.toFixed(2));
        $('.total .value').html('<span class="final"> $ ' + total.toFixed(2)+ '</span>');
      }
});
