<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
     iconClass: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title, iconClass } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />);
    }
    if (iconClass) {
      vnodes.push(<i class={iconClass} />);
    }

    if (title) {
      vnodes.push(<span class="menu-title" slot="title">{title}</span>);
    }
    return vnodes;
  }
};
</script>
