export default {
  data() {
    return {
      gig_categories: [
        {
          category_name: 'Logo & Branding',
          id: 1,
        },
        {
          category_name: 'Web & App Design',
          id: 2,
        },
        {
          category_name: 'Print Design',
          id: 3,
        },
        {
          category_name: 'graphics Design',
          id: 4,
        },
        {
          category_name: 'Art & Illustration',
          id: 5,
        },
      ],
      product_categories: [
        {
          category_name: 'Logo & Branding',
          id: 1,
        },
        {
          category_name: 'Web & App Design',
          id: 2,
        },
        {
          category_name: 'Print Design',
          id: 3,
        },
        {
          category_name: 'graphics Design',
          id: 4,
        },
        {
          category_name: 'Art & Illustration',
          id: 5,
        },
      ],
      seller_dashboard_items: [
        {
          title: 'My Gigs',
          link: '/dashboard/gig/list',
        },
        {
          title: 'My Products',
          link: '/dashboard/product/list',
        },
        {
          title: 'Orders',
          link: '/dashboard/order',
        },
        {
          title: 'Message',
          link: '/dashboard/message',
        },
        {
          title: 'Profile',
          link: '',
        },
        {
          title: 'Purchases',
          link: '/purchase',
        },
      ],
      buyer_dashboard_items: [
        {
          title: 'Orders',
          link: '/buyer/order',
        },
        {
          title: 'Message',
          link: '/dashboard/message',
        },
        {
          title: 'Profile',
          link: '',
        },
      ],
    }
  },

  methods: {},
  computed: {},
}
