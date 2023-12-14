# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-ham"
  spec.version       = "1.0.1"
  spec.authors       = ["Reinhart Previano Koentjoro"]
  spec.email         = ["reinhart@reinhart1010.id"]

  spec.summary       = "Hackapedia's Abstraction Machine."
  spec.homepage      = "https://github.com/reinhart1010/ham"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.3.1"
  spec.add_runtime_dependency 'jekyll-optional-front-matter', '~> 0.3.2'
  spec.add_runtime_dependency "jekyll-readme-index", "~> 0.3.0"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.7", ">= 2.7.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "jekyll-titles-from-headings", "~> 0.5.3"
  spec.add_runtime_dependency "kramdown-parser-gfm", "~> 1.1"
  spec.add_runtime_dependency "rouge", "~> 3.26", ">= 3.26.1"
  spec.add_runtime_dependency "listen", "~> 3.7"
end
