# Shader Compiler

A powerful shader compilation and optimization tool that bridges the gap between different graphics APIs and shader languages.

## Overview

This custom shader compiler supports multiple shader languages (GLSL, HLSL) and can automatically convert between them while generating reflection data for runtime use. Built with performance and developer experience in mind.

## Key Features

### Multi-Language Support

The compiler supports all major shader languages:
- **GLSL**: OpenGL Shading Language (Desktop and ES)
- **HLSL**: High-Level Shading Language (DirectX)
- **SPIR-V**: As an intermediate representation for cross-compilation

### Automatic Conversion

```glsl
// Input GLSL shader
#version 450

layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inNormal;
layout(location = 2) in vec2 inTexCoord;

layout(location = 0) out vec3 fragNormal;
layout(location = 1) out vec2 fragTexCoord;

void main() {
    gl_Position = vec4(inPosition, 1.0);
    fragNormal = inNormal;
    fragTexCoord = inTexCoord;
}
```

The tool can automatically convert this to HLSL:

```hlsl
// Generated HLSL shader
struct VS_INPUT {
    float3 Position : POSITION0;
    float3 Normal : NORMAL0;
    float2 TexCoord : TEXCOORD0;
};

struct VS_OUTPUT {
    float4 Position : SV_POSITION;
    float3 Normal : NORMAL0;
    float2 TexCoord : TEXCOORD0;
};

VS_OUTPUT main(VS_INPUT input) {
    VS_OUTPUT output;
    output.Position = float4(input.Position, 1.0);
    output.Normal = input.Normal;
    output.TexCoord = input.TexCoord;
    return output;
}
```

### Reflection Data Generation

The compiler generates detailed reflection data:

```json
{
  "inputs": [
    { "name": "inPosition", "location": 0, "type": "vec3" },
    { "name": "inNormal", "location": 1, "type": "vec3" },
    { "name": "inTexCoord", "location": 2, "type": "vec2" }
  ],
  "outputs": [
    { "name": "fragNormal", "location": 0, "type": "vec3" },
    { "name": "fragTexCoord", "location": 1, "type": "vec2" }
  ],
  "uniforms": [],
  "textures": []
}
```

## Optimization Passes

The compiler implements several optimization passes:

1. **Dead Code Elimination**: Removes unused variables and functions
2. **Constant Folding**: Evaluates constant expressions at compile time
3. **Loop Unrolling**: Unrolls small loops for better performance
4. **Register Allocation**: Optimizes register usage
5. **Instruction Scheduling**: Reorders instructions to minimize pipeline stalls

## Compilation Pipeline

```
Source Shader (GLSL/HLSL)
    ↓
Lexical Analysis
    ↓
Syntax Parsing (AST)
    ↓
Semantic Analysis
    ↓
IR Generation (SPIR-V)
    ↓
Optimization Passes
    ↓
Target Code Generation
    ↓
Reflection Data Export
```

## Usage Example

### Command Line Interface

```bash
# Compile GLSL to HLSL
shader-compiler --input shader.vert --output shader.hlsl --target hlsl

# Compile with optimization
shader-compiler -i shader.frag -o optimized.spv -O2

# Generate reflection data
shader-compiler -i shader.vert --reflect reflection.json
```

### API Usage

```cpp
#include <ShaderCompiler/Compiler.h>

// Create compiler instance
ShaderCompiler::Compiler compiler;

// Set compilation options
ShaderCompiler::Options options;
options.sourceLanguage = ShaderCompiler::Language::GLSL;
options.targetLanguage = ShaderCompiler::Language::HLSL;
options.optimizationLevel = 2;
options.generateReflection = true;

// Compile shader
auto result = compiler.Compile("shader.vert", options);

if (result.success) {
    // Use compiled shader
    const auto& code = result.compiledCode;
    const auto& reflection = result.reflectionData;
    
    // Write to file
    WriteFile("output.hlsl", code);
    WriteFile("reflection.json", reflection);
} else {
    // Handle errors
    std::cerr << "Compilation failed: " << result.errorMessage << std::endl;
}
```

## Performance Metrics

| Shader Type | Input Size | Compile Time | Output Size | Speedup vs Reference |
|-------------|-----------|--------------|-------------|----------------------|
| Simple Vertex | 150 LOC | 12ms | 180 LOC | 2.1x |
| Complex Fragment | 500 LOC | 45ms | 520 LOC | 1.8x |
| Compute Shader | 300 LOC | 28ms | 310 LOC | 2.3x |

## Supported Features

### GLSL Features
- [x] GLSL 450 (Vulkan)
- [x] GLSL ES 300/310/320
- [x] OpenGL 4.x compatibility
- [x] Geometry shaders
- [x] Tessellation shaders
- [x] Compute shaders

### HLSL Features
- [x] Shader Model 5.0
- [x] Shader Model 6.0
- [x] Root signatures
- [x] Descriptor tables
- [ ] Ray tracing shaders (planned)

## Building

### Prerequisites

- CMake 3.15+
- C++17 compiler
- SPIRV-Tools
- glslang

### Build Steps

```bash
git clone https://github.com/bakjedev/shader-compiler.git
cd shader-compiler
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build . -j8
```

## Error Handling

The compiler provides detailed error messages with line numbers and suggestions:

```
shader.vert:15:5: error: undeclared identifier 'unknownVariable'
    color = unknownVariable * 2.0;
            ^~~~~~~~~~~~~~~
Did you mean 'fragColor'?
```

## Future Development

- [ ] Add Metal Shading Language support
- [ ] Implement advanced optimization techniques
- [ ] Add visual shader graph editor
- [ ] Support for shader variants
- [ ] Hot-reload capabilities
- [ ] Integration with popular game engines

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please ensure:
- Code follows the project style guide
- All tests pass
- New features include documentation
- Commit messages are descriptive

---

*For more information, visit the [GitHub repository](https://github.com/bakjedev/shader-compiler)*
