define(['jquery', 'marionette',
  'helpers/template',
  'helpers/behavior-store'
], function($, Marionette,
  template,
  behaviorStore
) {
  'use strict';

  var $document = $(document);
  var selectTemplate = template('components/select');
  var selectOptionsTemplate = template('components/select-options');

  var SelectBehavior = Marionette.Behavior.extend({
    events: {
      'change select': 'onSelectChange',
      'click .select': 'onSelectClick'
    },

    initialize: function() {
      this.onSelectUnderlayClick = _.bind(this.onSelectUnderlayClick, this);
      this.onSelectOptionClick = _.bind(this.onSelectOptionClick, this);

      $document.on('click', '.select-underlay', this.onSelectUnderlayClick);
      $document.on('click', '.select-underlay .__option', this.onSelectOptionClick);
    },

    onRender: function() {
      this.$('.select').each(function(idx, el) {
        var $select = $(el);
        var val = $select.find('select option:selected').text();
        $select.prepend(selectTemplate({
          value: val
        }));
        $select.addClass($select.attr('data-color'));
      });
    },

    onDestroy: function() {
      $document.off('click', this.onSelectUnderlayClick);
      $document.off('click', this.onSelectOptionClick);
    },

    onSelectClick: function(ev) {
      var rect = ev.target.getBoundingClientRect();
      var $select = $(ev.target.parentNode);
      var val = $select.find('select').val();

      var options = _.map($('select option', $select), function(el) {
        return {
          value: el.value,
          label: el.innerText
        };
      });

      var $selectUnderlay = $(selectOptionsTemplate({
        options: options
      }));
      $selectUnderlay.addClass($select.attr('data-color')).addClass($select.attr('data-underlay-class'));

      $selectUnderlay.find('.__option[data-value=' + val + ']').addClass('selected');

      $selectUnderlay.find('.__options-container').css({
        'top': rect.top,
        'left': rect.left,
        'width': rect.width
      });

      $('body').append($selectUnderlay);

      $select.addClass('active');
    },

    onSelectChange: function(ev) {
      var $select = $(ev.target.parentNode);
      var $option = $select.find('select option:selected');

      $select.find('.__selected-value').text($option.text());
      $select.find('select').val(ev.target.value);
    },

    onSelectOptionClick: function(ev) {
      var $sel = this.$('.select.active select');
      $sel.val(ev.target.getAttribute('data-value'));
      $sel.trigger('change');
      this.removeUnderlay();
    },

    onSelectUnderlayClick: function(ev) {
      if (ev.target === ev.currentTarget) {
        this.removeUnderlay();
      }
    },

    removeUnderlay: function() {
      var $selectUnderlay = $('.select-underlay');
      if ($selectUnderlay.length > 0) {
        $('.select.active').removeClass('active');
        $selectUnderlay.remove();
      }
    }
  });

  behaviorStore.save('Select', SelectBehavior);

  return SelectBehavior;
});
