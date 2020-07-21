$('.label-list').on('click','.activate', function(event) {
    $('[class=activate]').prop('checked', false)
    $(event.target).prop('checked', true)
    remote.getGlobal('projectManager').activateLabel($(event.target).attr('id'))
});
