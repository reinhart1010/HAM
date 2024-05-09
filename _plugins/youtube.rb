class YouTubeTag < Liquid::Tag
  def initialize(tag_name, arg, parse_context)
    super
    # @type [String]
    @arg = arg
  end
  def render(context)
    output = <<HTML
<iframe src="/_embed/youtube.html?id=#{@arg}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" width="320" height="240" allowfullscreen>
  View video on <a href="https://youtube.com/watch?v={@arg}">YouTube</a>
</iframe>
HTML
    return output
  end
end
Liquid::Template.register_tag('youtube', YouTubeTag)