// ==UserScript==
// @name            Torn - Faction bank
// @description     Shows faction member's donation info
// @author          BloodyMind [1629016]
// @namespace       https://greasyfork.org/users/5563-bloody
// @version         1.0.3
// @match           *://www.torn.com/factions.php?step=your*
// @match           *://torn.com/factions.php?step=your*
// @grant           none
// ==/UserScript==

$.ajaxSetup({
    dataFilter: function(data, type) {
        if (data.indexOf('<div class="faction-info-wrap ">') == 0) {
            data = $.parseHTML(data);
            $.ajax({
                url: '/temp_factiondonations.php',
                type: 'get',
                async: false,
                success: function(response) {
                    response = $($.parseHTML(response)).find('tr:not(:first-child)');
                    for (var i = 0; i < response.length; i++) {
                        $(data).find('span.m-hide a.user.name[href="/profiles.php?XID=' + $(response[i]).children().eq(0).text().trim() + '"]').parent().parent().parent().find('div.member-icons ul').append(($(response[i]).children().eq(2).text().trim() === '$0' ? '' : ('<li id="icon28" class="iconShow" style="margin-bottom: 0px;" title="<b>Money</b><br>' + $(response[i]).children().eq(2).text().trim() + '</b>"></li>')) + ($(response[i]).children().eq(3).text().trim() === '0' ? '' : ('<li id="icon54" class="iconShow" style="margin-bottom: 0px;" title="<b>Points</b><br>' + $(response[i]).children().eq(3).text().trim() + '</b>"></li>')));
                    }
                    return $(data).html();
                }
            });
        }
        return data;
    }
});