# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-ham"
  spec.version       = "0.1.0"
  spec.authors       = ["Reinhart Previano Koentjoro"]
  spec.email         = ["reinhart@reinhart1010.id"]

  spec.summary       = "Hackapedia's Abstraction Machine."
  spec.homepage      = "https://github.com/reinhart1010/ham"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
