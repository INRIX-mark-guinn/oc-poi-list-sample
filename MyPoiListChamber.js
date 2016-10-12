define(function (require) {
    'use strict';

    const
        {h} = require('preact'), // this is only required for METHOD 2
        ListItem = require('common/ui/list/ListItem'),
        ListControl = require('common/ui/ListControl'),
        ListChamber = require('common/platform/chamber/ListChamberAlpha');

    // NOTE: the below would ideally happen in the PROFILE

    // METHOD 1: map the data below to the standard text, status, icon, etc fields
    ListControl.DataMapping.addType('poi', function (src) {
        let stars = '', price = '';
        for (let i = Math.floor(src.rating); i > 0; i--) stars += '★';
        for (let i = Math.floor(src.priceLevel); i > 0; i--) price += '$';

        return {
            icon:   src.image,
            text:   [
                src.name,
                `${src.location} (${src.distance}mi)`,
                src.reviewText
            ],
            status: [
                stars,
                price,
                `${src.reviewCount} reviews`
            ]
        };
    });

    // METHOD 2: provide your own react control
    // ListControl.Item.addType('poi', function(props) {
    //     // you'd obviously want to flesh this out. Note that you don't have to wrap it
    //     // in the original ListItem control. You could also use <li> instead. This way
    //     // just gives you all the same classes and data props as the original.
    //     return (
    //         <ListItem {...props}>
    //             <span className="poi-name">{props.name}</span>
    //         </ListItem>
    //     )
    // });

    // METHOD 3: custom handlebars template
    // ListControl.DataMapping.addType('poi', function(src) {
    //     // NOTE: it's really important to return a new object from these functions
    //     // NOTE: handlebars templates are already wrapped by the LI
    //     return Object.assign({
    //         template: '<span class="poi-name">{{name}}</span>'
    //     }, src);
    // });

    class MutationChamber extends ListChamber {
        getListConfig () {
            return {
                // layout:   "hero",
                itemType: "poi"
            };
        }

        data () {
            return [{
                name:              'Elliott Bay Brewery & Pub',
                reviewCount:       121,
                rating:            4.4,
                categories:        ['restaurants'],
                priceLevel:        2,
                travelMin:         'n/a',
                location:          '4720 California Ave SW, Seattle, WA 98116',
                image:             'https://lh6.googleusercontent.com/-X3hD0FFkqFQ/V-wZE0d0h7I/AAAAAAAAABk/PiA6VixKLvkjJTMKrCszEInNBDfkTWS8ACLIB/s408-k-no/',
                routeQualityColor: 'white',
                reviewText:        'IPAzzzzzzzz for everyone...',
                hours:             0.25,
                distance:          5.4,
            }, {
                name:              'Pecado Bueno',
                reviewCount:       23,
                rating:            3.7,
                categories:        ['restaurants'],
                priceLevel:        2,
                travelMin:         'n/a',
                location:          '4523 California Ave SW, Seattle, WA 98116',
                image:             'https://lh6.googleusercontent.com/-YZdEHdpuOYQ/V5FsHM6pohI/AAAAAAAATSA/Tw3kyQ_LeecBh4iWRU4lgQi6PEffFaL8ACLIB/s408-k-no/',
                routeQualityColor: 'white',
                reviewText:        "The service is friendly and the nachos are delicious.",
                hours:             0.27,
                distance:          5.2,
            }];
        }
    }

    return MutationChamber;
});
