#include <string>
#include <vector>

struct dm_data {
    int width;
    int height;
    int channels;
    std::vector<unsigned char> pixels;
};

struct dm_image {
    int cols;
    int rows;
    int channels;
    unsigned char *data;
};

struct dm_decode_opts {
    unsigned int timeout;
    unsigned int shrink;
    unsigned int squareDevnDeg;
    unsigned int threshold;
};


class DataMatrix {
public:
    DataMatrix();
    ~DataMatrix();

    void setData(const std::string &data);

    void encode(const std::string &text, dm_data &result);
    void decode(const dm_image &image, const dm_decode_opts &decodeOpts, std::string &decodedText);

    std::string pathToFile() const;

private:
    std::string m_path; // output path
    std::string m_filename;
};
